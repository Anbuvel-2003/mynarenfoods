"use client";

import { CATEGORIES_DATA } from "@/constants/categories";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingCart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/utils/cn";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-background pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-4 tracking-tighter text-foreground leading-tight"
          >
            Explore Our <span className="text-primary-500">Gourmet Universe</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-muted max-w-2xl mx-auto"
          >
            From farm-fresh masalas to artisan wellness products, discover the pure heart of organic living in every category.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {CATEGORIES_DATA.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="group relative h-[450px] rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500"
            >
              {/* Category Image */}
              <div className="absolute inset-0 z-0">
                <Image 
                  src={category.image || "/category-grocery.png"} 
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end text-white">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 glass-card rounded-2xl flex items-center justify-center text-2xl border-white/20">
                    {category.icon}
                  </div>
                  {category.weight && (
                    <span className="text-[10px] font-bold px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 uppercase tracking-[0.2em]">
                      {category.weight}
                    </span>
                  )}
                </div>

                <h2 className="text-3xl font-black mb-3 tracking-tight group-hover:text-primary-400 transition-colors">
                  {category.name}
                </h2>
                
                <p className="text-sm text-white/70 line-clamp-2 mb-6 font-medium">
                  Experience the finest {category.name.toLowerCase()} products, curated for quality and health.
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white/50 uppercase tracking-widest">
                    {category.products.length} Products
                  </span>
                  
                  <Link href={`/categories/${category.id}`}>
                    <button className="flex items-center gap-2 bg-primary-500 hover:bg-primary-400 text-white px-6 py-3 rounded-2xl font-bold transition-all transform active:scale-95 group/btn">
                      Explore <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
