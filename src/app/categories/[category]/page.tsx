"use client";

import { CATEGORIES_DATA } from "@/constants/categories";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, SlidersHorizontal, Grid3X3, List } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { notFound } from "next/navigation";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";

export default function CategoryDetailPage() {
  const params = useParams();
  const categoryId = params.category as string;
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const category = CATEGORIES_DATA.find(c => c.id === categoryId);
  
  if (!category) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-background pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-text-muted mb-8">
          <Link href="/" className="hover:text-primary-500 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-primary-500 transition-colors">Categories</Link>
          <span>/</span>
          <span className="text-primary-500">{category.name}</span>
        </div>

        {/* Hero Header */}
        <div className="relative h-[300px] md:h-[400px] rounded-[3rem] overflow-hidden mb-12 shadow-2xl">
          <Image 
            src={category.image || "/category-grocery.png"} 
            alt={category.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-center px-12 text-white">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-4 mb-4">
                <span className="text-4xl">{category.icon}</span>
                <span className="h-1 w-12 bg-primary-500 rounded-full" />
                <span className="font-bold uppercase tracking-[0.3em] text-white/60">Collection</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter">
                {category.name}
              </h1>
              <p className="text-lg text-white/70 max-w-lg font-medium leading-relaxed">
                Discover our handpicked selection of {category.products.length} premium organic {category.name.toLowerCase()} products.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 p-6 glass-card border-card-border/50">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-section-bg border border-card-border hover:border-primary-500/30 transition-all font-bold text-sm">
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </button>
            <div className="h-8 w-[1px] bg-card-border mx-2" />
            <span className="text-sm font-bold text-text-muted">Showing {category.products.length} Results</span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setViewMode("grid")}
              className={cn("p-3 rounded-xl transition-all", viewMode === "grid" ? "bg-primary-500 text-white shadow-lg shadow-primary-500/20" : "bg-section-bg hover:bg-card-border")}
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setViewMode("list")}
              className={cn("p-3 rounded-xl transition-all", viewMode === "list" ? "bg-primary-500 text-white shadow-lg shadow-primary-500/20" : "bg-section-bg hover:bg-card-border")}
            >
              <List className="w-5 h-5" />
            </button>
            <select className="bg-section-bg border border-card-border rounded-xl px-4 py-3 text-sm font-bold outline-none focus:border-primary-500/30">
              <option>Newest Arrivals</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Most Popular</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className={cn(
          "grid gap-8",
          viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
        )}>
          {category.products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={{...product, category}} 
              layout={viewMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
