import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from "stripe"

const getStripeClient = () => {
    const stripeKey = process.env.STRIPE_SECRET_KEY
    if (!stripeKey) {
        return null
    }
    return new Stripe(stripeKey)
}


// Placing orders using COD Method
const placeOrder = async (req, res) => {

    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Cash On Delivery",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: "Order Placed" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// Placing orders using Stripe Method
const placeOrderStripe = async (req, res) => {
    try {
        const stripe = getStripeClient()
        if (!stripe) {
            return res.json({ success: false, message: "Stripe is not configured on server" })
        }

        const { userId, items, amount, address } = req.body

        if (!Array.isArray(items) || items.length === 0) {
            return res.json({ success: false, message: "No items found in order" })
        }

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const lineItems = items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.name,
                    images: item.image?.[0] ? [item.image[0]] : []
                },
                unit_amount: Math.round(Number(item.price) * 100)
            },
            quantity: item.quantity
        }))

        const itemTotal = items.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0)
        const deliveryCharge = Math.max(0, Number(amount) - itemTotal)

        if (deliveryCharge > 0) {
            lineItems.push({
                price_data: {
                    currency: "usd",
                    product_data: { name: "Delivery Fee" },
                    unit_amount: Math.round(deliveryCharge * 100)
                },
                quantity: 1
            })
        }

        const frontendUrl = process.env.FRONTEND_URL || req.headers.origin

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: lineItems,
            success_url: `${frontendUrl}/orders?stripe=success&orderId=${newOrder._id}&session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${frontendUrl}/place-order?stripe=cancelled`,
            metadata: {
                orderId: String(newOrder._id),
                userId
            }
        })

        res.json({ success: true, sessionUrl: session.url })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Placing orders using Razorpay Method
const placeOrderRazorpay = async (req, res) => {
    res.json({ success: false, message: "Razorpay is not implemented yet" })
}

// Placing orders using Mock Payment Method (demo only)
const placeOrderMock = async (req, res) => {
    try {
        const { userId, items, amount, address, simulateStatus } = req.body

        if (!Array.isArray(items) || items.length === 0) {
            return res.json({ success: false, message: "No items found in order" })
        }

        // Simulate gateway rejection for demo/testing scenarios.
        if (simulateStatus === "failed") {
            return res.json({ success: false, message: "Mock payment failed" })
        }

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Mock Payment",
            payment: true,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: "Mock payment successful. Order placed." })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// Verify Stripe session and mark order as paid
const verifyStripe = async (req, res) => {
    try {
        const stripe = getStripeClient()
        if (!stripe) {
            return res.json({ success: false, message: "Stripe is not configured on server" })
        }

        const { orderId, sessionId, userId } = req.body
        if (!orderId || !sessionId) {
            return res.json({ success: false, message: "Missing verification data" })
        }

        const order = await orderModel.findById(orderId)
        if (!order) {
            return res.json({ success: false, message: "Order not found" })
        }

        if (String(order.userId) !== String(userId)) {
            return res.json({ success: false, message: "Not authorized for this order" })
        }

        if (order.payment) {
            return res.json({ success: true, message: "Payment already verified" })
        }

        const session = await stripe.checkout.sessions.retrieve(sessionId)

        if (session.payment_status === "paid") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            return res.json({ success: true, message: "Payment verified" })
        }

        res.json({ success: false, message: "Payment is not completed" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// All Orders data for Admin Panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({success:true, orders})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// User Order Data For Forntend
const userOrders = async (req, res) => {
    try {
        const { userId } = req.body

        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// update order status from Admin Panel
const updateStatus = async (req, res) => {
    try {
        const {orderId,status} = req.body
        await orderModel.findByIdAndUpdate(orderId,{status})
        res.json({success:true, message: 'Status Updated'})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { placeOrder, placeOrderStripe, placeOrderRazorpay, placeOrderMock, verifyStripe, allOrders, userOrders, updateStatus }