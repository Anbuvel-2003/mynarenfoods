"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, Eye, Star, ArrowRight, Info } from "lucide-react";
import { Button } from "./ui/Button";
import { cn } from "@/utils/cn";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    rating?: number;
    reviews?: number;
    image?: string;
    description?: string;
    category?: {
      id: string;
      name: string;
      image?: string;
    };
  };
  layout?: "grid" | "list";
  showQuickView?: boolean;
  className?: string;
}

export const ProductCard = ({ 
  product, 
  layout = "grid", 
  showQuickView = true, 
  className 
}: ProductCardProps) => {
  const displayImage = product.image || product.category?.image || "/category-grocery.png";
  const isList = layout === "list";

  if (isList) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className={cn(
          "group relative glass-card overflow-hidden flex flex-col md:flex-row items-center gap-8 p-6 hover:border-primary-500/30 transition-all duration-500",
          className
        )}
      >
        {/* Image - Left Side */}
        <div className="relative w-full md:w-64 aspect-square rounded-3xl overflow-hidden bg-section-bg shrink-0 shadow-lg">
          <Image
            src={displayImage}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute top-4 left-4">
             <span className="bg-primary-500 text-white text-[9px] font-black px-3 py-1.5 rounded-lg uppercase tracking-[0.2em] shadow-lg">
              Organic
            </span>
          </div>
          {/* Quick Add Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button size="sm" className="scale-90 group-hover:scale-100 transition-transform shadow-xl">
              <ShoppingCart className="w-4 h-4 mr-2" /> Add
            </Button>
          </div>
        </div>

        {/* Content - Right Side */}
        <div className="flex-1 flex flex-col py-2 w-full">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-1 bg-yellow-400/10 px-2.5 py-1 rounded-lg border border-yellow-400/20">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs font-black text-yellow-700">{product.rating || "4.8"}</span>
                </div>
                <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">({product.reviews || "120"} Reviews)</span>
              </div>
              <Link href={`/products/${product.id}`}>
                <h3 className="text-2xl md:text-3xl font-black text-foreground mb-3 tracking-tight group-hover:text-primary-500 transition-colors">
                  {product.name}
                </h3>
              </Link>
              <p className="text-text-muted text-sm font-medium leading-relaxed max-w-xl line-clamp-2 md:line-clamp-3">
                {product.description || "Premium quality organic product, sustainably sourced and processed using traditional methods to preserve authentic flavors and nutritional value."}
              </p>
            </div>

            <div className="flex flex-col md:items-end shrink-0">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-3xl font-black text-primary-500">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="text-sm text-text-muted line-through font-medium">₹{product.originalPrice}</span>
                )}
              </div>
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-4">Inc. all taxes</span>
              <div className="flex items-center gap-3">
                <button className="w-12 h-12 rounded-xl border border-card-border flex items-center justify-center hover:bg-red-500/5 hover:text-red-500 hover:border-red-500/20 transition-all active:scale-90 shadow-sm">
                  <Heart className="w-5 h-5" />
                </button>
                <Link href={`/products/${product.id}`}>
                  <button className="h-12 px-6 rounded-xl bg-primary-500 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-primary-500/20 hover:bg-primary-600 transition-all flex items-center gap-2 group/btn">
                    View Product <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-auto flex flex-wrap items-center gap-6 pt-6 border-t border-card-border/50">
            {[
              { icon: Info, text: "Natural Ingredients" },
              { icon: ShoppingCart, text: "Fresh Stock" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <item.icon className="w-4 h-4 text-primary-500/60" />
                <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  // Grid Layout (Default)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={cn(
        "group relative card-premium overflow-hidden flex flex-col h-full bg-card-bg",
        className
      )}
    >
      {/* Image Container */}
      <div className="aspect-square relative overflow-hidden bg-section-bg">
        <Image
          src={displayImage}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-95 group-hover:opacity-100"
        />

        <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
          {product.originalPrice && (
            <div className="bg-accent-500 text-white text-[10px] font-black px-3 py-1.5 rounded-lg shadow-lg uppercase tracking-widest">
              Save {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </div>
          )}
          <div className="bg-primary-500/90 backdrop-blur-md text-white text-[9px] font-black px-2.5 py-1 rounded-md uppercase tracking-[0.2em] border border-white/20">
            Organic
          </div>
        </div>

        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-14 group-hover:translate-x-0 transition-transform duration-500 ease-out z-20">
          <button className="w-10 h-10 rounded-xl bg-white/90 dark:bg-black/80 backdrop-blur-md shadow-xl flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all transform hover:scale-110 active:scale-90">
            <Heart className="w-4 h-4" />
          </button>
          {showQuickView && (
            <Link href={`/products/${product.id}`}>
              <button className="w-10 h-10 rounded-xl bg-white/90 dark:bg-black/80 backdrop-blur-md shadow-xl flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all transform hover:scale-110 active:scale-90">
                <Eye className="w-4 h-4" />
              </button>
            </Link>
          )}
        </div>

        <div className="absolute inset-x-4 bottom-4 translate-y-16 group-hover:translate-y-0 transition-transform duration-500 ease-out z-20">
          <Button className="w-full h-12 rounded-xl shadow-2xl shadow-primary-500/20 font-black text-xs uppercase tracking-widest">
            <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
          </Button>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
              <span className="text-sm font-black tracking-tighter text-foreground">{product.rating || "4.8"}</span>
            </div>
            <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest">({product.reviews || "120"} Reviews)</span>
          </div>
        </div>

        <Link href={`/products/${product.id}`} className="block group/title">
          <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2 leading-tight group-hover/title:text-primary-500 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto pt-4 border-t border-card-border/50 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-primary-500">₹{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-text-muted line-through font-medium">₹{product.originalPrice}</span>
            )}
          </div>
          <Link href={`/products/${product.id}`}>
            <button className="text-[10px] font-black text-primary-500 uppercase tracking-widest hover:underline underline-offset-4">
              Details
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};
