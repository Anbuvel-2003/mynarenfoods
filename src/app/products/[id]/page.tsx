"use client";

import { CATEGORIES_DATA } from "@/constants/categories";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  ArrowLeft, ShoppingCart, Star, ShieldCheck, 
  Truck, RefreshCcw, Heart, Share2, Plus, Minus,
  CheckCircle2, Info
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { notFound } from "next/navigation";
import { useState, useMemo } from "react";
import { ProductCard } from "@/components/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "reviews" | "shipping">("description");

  // Find product and its category
  const data = useMemo(() => {
    for (const category of CATEGORIES_DATA) {
      const product = category.products.find(p => p.id === productId);
      if (product) return { product, category };
    }
    return null;
  }, [productId]);

  if (!data) return notFound();

  const { product, category } = data;

  return (
    <div className="min-h-screen bg-background pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-text-muted mb-12">
          <Link href="/" className="hover:text-primary-500 transition-colors">Home</Link>
          <span className="opacity-30">/</span>
          <Link href={`/categories/${category.id}`} className="hover:text-primary-500 transition-colors">{category.name}</Link>
          <span className="opacity-30">/</span>
          <span className="text-primary-500">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl shadow-primary-500/5 group border border-card-border/50">
              <Image 
                src={category.image || "/category-grocery.png"} 
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute top-6 left-6 flex flex-col gap-3">
                <span className="px-4 py-1.5 bg-primary-500 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg shadow-primary-500/20">
                  Premium Organic
                </span>
                <span className="px-4 py-1.5 bg-white/90 dark:bg-black/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest border border-card-border shadow-lg">
                  Authentic Taste
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative aspect-square rounded-2xl overflow-hidden border-2 border-transparent hover:border-primary-500 transition-all cursor-pointer bg-section-bg opacity-70 hover:opacity-100">
                  <Image src={category.image || "/category-grocery.png"} alt="thumb" fill className="object-cover" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: Product Info */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1 bg-yellow-400/10 px-3 py-1.5 rounded-xl border border-yellow-400/20">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-black text-yellow-700">{product.rating || "4.9"}</span>
                </div>
                <span className="text-xs font-bold text-text-muted">{product.reviews || "250"}+ Customer Reviews</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tighter text-foreground leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-4xl font-black text-primary-500">₹{product.price}</span>
                <span className="text-lg text-text-muted line-through">₹{Math.round(product.price * 1.3)}</span>
                <span className="text-sm font-bold text-accent-500 uppercase tracking-widest bg-accent-500/10 px-3 py-1 rounded-lg">Save 30%</span>
              </div>
              
              <p className="text-lg text-text-muted leading-relaxed font-medium mb-8">
                {product.description || "Our premium quality organic product is sourced directly from certified organic farmers across India. Processed using traditional methods to ensure that every pack delivers authentic flavor and maximum nutritional benefits."}
              </p>
            </div>

            {/* Selection */}
            <div className="space-y-8 mb-10 p-8 glass-card border-primary-500/10">
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-text-muted mb-4">Quantity</label>
                <div className="flex items-center gap-6">
                  <div className="flex items-center bg-section-bg rounded-2xl border border-card-border p-1">
                    <button 
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 flex items-center justify-center hover:text-primary-500 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-black text-lg">{quantity}</span>
                    <button 
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 flex items-center justify-center hover:text-primary-500 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-sm font-bold text-text-muted">In Stock: 50+ Units Available</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 h-16 bg-primary-500 text-white rounded-2xl font-black text-lg shadow-xl shadow-primary-500/20 hover:bg-primary-600 active:scale-95 transition-all flex items-center justify-center gap-3">
                  <ShoppingCart className="w-6 h-6" />
                  Add to Cart
                </button>
                <button className="w-16 h-16 rounded-2xl border-2 border-card-border flex items-center justify-center hover:border-primary-500 hover:text-primary-500 transition-all active:scale-90">
                  <Heart className="w-6 h-6" />
                </button>
                <button className="w-16 h-16 rounded-2xl border-2 border-card-border flex items-center justify-center hover:border-primary-500 hover:text-primary-500 transition-all active:scale-90">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-4 mb-12">
              {[
                { icon: Truck, text: "Free Delivery" },
                { icon: ShieldCheck, text: "Certified Organic" },
                { icon: RefreshCcw, text: "Easy Returns" },
                { icon: Info, text: "Chemical Free" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-section-bg/50 border border-card-border/50">
                  <item.icon className="w-5 h-5 text-primary-500" />
                  <span className="text-xs font-bold uppercase tracking-widest">{item.text}</span>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="border-t border-card-border pt-10">
              <div className="flex gap-8 mb-8 border-b border-card-border">
                {["description", "reviews", "shipping"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={cn(
                      "pb-4 text-sm font-black uppercase tracking-widest transition-all relative",
                      activeTab === tab ? "text-primary-500" : "text-text-muted hover:text-foreground"
                    )}
                  >
                    {tab}
                    {activeTab === tab && <motion.div layoutId="tab" className="absolute bottom-0 left-0 right-0 h-1 bg-primary-500 rounded-full" />}
                  </button>
                ))}
              </div>
              
              <div className="min-h-[150px]">
                {activeTab === "description" && (
                  <div className="space-y-6">
                    <p className="text-text-muted leading-relaxed font-medium">
                      Experience the authentic taste of {product.name} from {category.name}. Our commitment to quality means we only source from traditional farmers who use sustainable organic practices. No artificial colors, preservatives, or chemical fertilizers were used in the making of this product.
                    </p>
                    <ul className="space-y-3">
                      {["100% Pure Organic", "Rich in Natural Antioxidants", "Traditional Stone-Ground Processing", "Vacuum Packed for Freshness"].map((point, i) => (
                        <li key={i} className="flex items-center gap-3 text-sm font-bold text-foreground">
                          <CheckCircle2 className="w-5 h-5 text-primary-500" /> {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {activeTab === "reviews" && (
                  <div className="text-center py-10 glass-card">
                    <p className="text-text-muted font-bold mb-4">No reviews yet for this batch.</p>
                    <button className="px-6 py-2 rounded-xl border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white transition-all font-bold">Write a Review</button>
                  </div>
                )}
                {activeTab === "shipping" && (
                  <div className="space-y-4 text-text-muted font-medium">
                    <p>• Standard Delivery: 3-5 Business Days</p>
                    <p>• Free shipping on orders above ₹999</p>
                    <p>• 100% Contactless Delivery available</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <div className="mt-24 pt-24 border-t border-card-border">
          <h2 className="text-3xl font-black mb-12 tracking-tighter">You Might Also <span className="text-primary-500">Like</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {category.products.filter(p => p.id !== productId).slice(0, 4).map((p) => (
              <ProductCard key={p.id} product={{...p, category}} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
