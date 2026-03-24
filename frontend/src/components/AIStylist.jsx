import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import ProductItem from "./ProductItem";
import Title from "./Title";

const AIStylist = () => {
    const { backendUrl } = useContext(ShopContext);
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [reply, setReply] = useState("");
    const [results, setResults] = useState([]);
    const [source, setSource] = useState("");

    const handleAskStylist = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) {
            toast.error("Please write your style request first");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(backendUrl + "/api/ai/stylist", { message: prompt });
            if (!response.data.success) {
                toast.error(response.data.message || "Could not generate recommendations");
                return;
            }
            setReply(response.data.reply || "");
            setResults(response.data.products || []);
            setSource(response.data.source || "fallback");
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="elev-card p-5 sm:p-7 overflow-hidden relative">
            <div className="absolute -top-24 -right-20 w-64 h-64 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.3),_transparent_60%)] pointer-events-none" />
            <div className="flex items-center justify-between gap-3 flex-wrap">
                <Title text1={"AI"} text2={"STYLIST"} />
                {source && (
                    <span className="text-xs px-3 py-1 rounded-full border border-slate-300 text-slate-700">
                        Mode: {source === "ai" ? "Smart AI" : "Smart Fallback"}
                    </span>
                )}
            </div>

            <p className="text-sm text-slate-600 mt-2">
                Ask for outfits by occasion, vibe, color, season, or budget. Example: "Need a minimal office look under 4000".
            </p>

            <form onSubmit={handleAskStylist} className="mt-4 flex flex-col sm:flex-row gap-3">
                <input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="flex-1 rounded-xl border border-slate-300 bg-white/85 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-400"
                    placeholder="Describe your style request..."
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl px-5 py-3 text-sm font-semibold bg-slate-900 text-white disabled:opacity-60"
                >
                    {loading ? "Styling..." : "Ask AI Stylist"}
                </button>
            </form>

            {reply && (
                <div className="mt-4 rounded-xl border border-slate-200 p-4 bg-white/70 text-sm text-slate-700 leading-relaxed">
                    {reply}
                </div>
            )}

            {!!results.length && (
                <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    {results.map((item) => (
                        <ProductItem key={item._id} id={item._id} image={item.image} name={item.name} price={item.price} />
                    ))}
                </div>
            )}
        </section>
    );
};

export default AIStylist;
