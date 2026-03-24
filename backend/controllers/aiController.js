import productModel from "../models/productModel.js"

const tokenize = (text = "") =>
    text
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, " ")
        .split(/\s+/)
        .filter(Boolean)

const scoreProduct = (product, queryTokens) => {
    const fields = [
        product.name,
        product.description,
        product.category,
        product.subCategory,
        ...(product.sizes || []),
    ]
        .join(" ")
        .toLowerCase()

    let score = 0
    for (const token of queryTokens) {
        if (fields.includes(token)) score += 2
        if (product.name.toLowerCase().includes(token)) score += 3
        if ((product.category || "").toLowerCase() === token) score += 2
        if ((product.subCategory || "").toLowerCase() === token) score += 2
    }
    return score
}

const rankProductsFallback = (products, query) => {
    const tokens = tokenize(query)
    if (!tokens.length) return products.slice(0, 20)

    return products
        .map((product) => ({ product, score: scoreProduct(product, tokens) }))
        .sort((a, b) => b.score - a.score)
        .map((item) => item.product)
        .slice(0, 20)
}

const tryOpenAI = async (prompt) => {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) return null

    const model = process.env.OPENAI_MODEL || "gpt-4o-mini"

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model,
            temperature: 0.2,
            messages: [
                {
                    role: "system",
                    content:
                        "You are an ecommerce ranking assistant. Always return strict JSON only.",
                },
                { role: "user", content: prompt },
            ],
        }),
    })

    if (!response.ok) return null
    const data = await response.json()
    const content = data?.choices?.[0]?.message?.content
    if (!content) return null

    try {
        return JSON.parse(content)
    } catch {
        const jsonMatch = content.match(/\{[\s\S]*\}/)
        if (!jsonMatch) return null
        try {
            return JSON.parse(jsonMatch[0])
        } catch {
            return null
        }
    }
}

const buildCatalog = (products) =>
    products.map((p) => ({
        id: p._id,
        name: p.name,
        category: p.category,
        subCategory: p.subCategory,
        price: p.price,
        sizes: p.sizes,
        bestseller: !!p.bestseller,
        description: p.description,
    }))

const mapIdsToProducts = (ids, allProducts) => {
    const byId = new Map(allProducts.map((p) => [String(p._id), p]))
    return ids.map((id) => byId.get(String(id))).filter(Boolean)
}

const aiSearchProducts = async (req, res) => {
    try {
        const { query } = req.body
        if (!query || !query.trim()) {
            return res.json({ success: false, message: "Query is required" })
        }

        const products = await productModel.find({}).lean()
        const fallbackRanked = rankProductsFallback(products, query)

        const catalog = buildCatalog(products)
        const aiResult = await tryOpenAI(
            `User search query: "${query}".\n` +
                `Catalog JSON: ${JSON.stringify(catalog)}\n` +
                `Return JSON with shape: {"productIds":["id1","id2"],"summary":"short reason"}. Choose up to 20 IDs in best relevance order.`
        )

        if (!aiResult?.productIds?.length) {
            return res.json({
                success: true,
                source: "fallback",
                summary: "Keyword + category relevance ranking.",
                products: fallbackRanked,
            })
        }

        const aiRanked = mapIdsToProducts(aiResult.productIds, products)
        const merged = [...aiRanked]
        for (const item of fallbackRanked) {
            if (!merged.find((x) => String(x._id) === String(item._id))) merged.push(item)
        }

        res.json({
            success: true,
            source: "ai",
            summary: aiResult.summary || "AI semantic matching completed.",
            products: merged.slice(0, 20),
        })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const aiStylistAssistant = async (req, res) => {
    try {
        const { message } = req.body
        if (!message || !message.trim()) {
            return res.json({ success: false, message: "Message is required" })
        }

        const products = await productModel.find({}).lean()
        const fallbackProducts = rankProductsFallback(products, message).slice(0, 6)

        const catalog = buildCatalog(products)
        const aiResult = await tryOpenAI(
            `User styling request: "${message}".\n` +
                `Catalog JSON: ${JSON.stringify(catalog)}\n` +
                `Return JSON with shape: {"reply":"2-4 sentence stylist response","productIds":["id1","id2"]}. Pick up to 6 product IDs.`
        )

        if (!aiResult?.productIds?.length) {
            return res.json({
                success: true,
                source: "fallback",
                reply:
                    "Here are some matching pieces based on your request. You can refine by category, style, or budget for better picks.",
                products: fallbackProducts,
            })
        }

        const aiProducts = mapIdsToProducts(aiResult.productIds, products).slice(0, 6)
        res.json({
            success: true,
            source: "ai",
            reply:
                aiResult.reply ||
                "I picked a set of products that match your style request. Want a budget-focused or occasion-based set next?",
            products: aiProducts,
        })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { aiSearchProducts, aiStylistAssistant }
