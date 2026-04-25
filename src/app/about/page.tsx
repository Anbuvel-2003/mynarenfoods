"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight, CheckCircle2, Leaf, ShieldCheck, Truck, Users, Globe, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

export default function AboutPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="bg-background min-h-screen">
      
      {/* 1. Hero Section - The Vision */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 0.2], [0, -100]) }}
          className="absolute inset-0 z-0"
        >
          <Image 
            src="/about-farm.png" 
            alt="Organic Farm" 
            fill 
            className="object-cover brightness-50"
          />
        </motion.div>
        
        <div className="relative z-10 text-center px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 bg-primary-500/20 text-primary-400 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-8 border border-primary-500/30 backdrop-blur-md">
              Established 2024
            </span>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-none">
              Nurturing Life Through <br /> <span className="text-primary-400">Pure Organic</span> Excellence
            </h1>
            <p className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto font-medium leading-relaxed">
              We are on a mission to bring the authentic, chemical-free essence of nature back to every modern kitchen.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-1 h-12 bg-gradient-to-b from-primary-500 to-transparent rounded-full" />
        </div>
      </section>

      {/* 2. Our Story - The Beginning */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
              A Journey Rooted in <span className="text-primary-500">Purity</span>
            </h2>
            <p className="text-lg text-text-muted leading-relaxed font-medium">
              MyNarenFoods was born from a simple observation: the authentic taste of our heritage was disappearing under the weight of industrial processing. We set out to rediscover the stone-ground spices, the hand-extracted oils, and the sun-dried grains that our ancestors thrived on.
            </p>
            <div className="grid grid-cols-2 gap-8">
              {[
                { label: "100%", sub: "Organic Certified" },
                { label: "50+", sub: "Artisan Products" },
                { label: "10k+", sub: "Happy Families" },
                { label: "20+", sub: "Regional Farms" }
              ].map((stat, i) => (
                <div key={i} className="border-l-2 border-primary-500 pl-6 py-2">
                  <div className="text-3xl font-black text-foreground">{stat.label}</div>
                  <div className="text-xs font-bold text-text-muted uppercase tracking-widest mt-1">{stat.sub}</div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl"
          >
            <Image src="/about-store.png" alt="Our Store" fill className="object-cover" />
          </motion.div>
        </div>
      </section>

      {/* 3. Preparation Process - The Magic (Horizontal Scroll Look) */}
      <section className="py-32 bg-section-bg">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">The Art of <span className="text-primary-500">Preparation</span></h2>
          <p className="text-text-muted max-w-2xl mx-auto font-medium">We don't just process; we preserve. Our methods are a blend of ancient wisdom and modern precision.</p>
        </div>
        
        <div className="flex overflow-x-auto gap-8 px-6 pb-12 no-scrollbar">
          {[
            { img: "/about-grinding.png", title: "Stone Grounding", desc: "Traditional slow grinding to preserve natural oils and intense aromas." },
            { img: "/about-quality.png", title: "Purity Check", desc: "Every batch undergoes rigorous lab testing for chemical-free certification." },
            { img: "/about-packaging.png", title: "Eco-Packaging", desc: "Sustainable, minimalist packaging that keeps products fresh and the earth green." },
            { img: "/about-farm.png", title: "Direct Sourcing", desc: "Harvested at peak ripeness directly from our network of organic farms." },
            { img: "/about-store.png", title: "Curated Care", desc: "Hand-picked and inspected by experts before reaching your doorstep." }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="min-w-[350px] md:min-w-[450px] group"
            >
              <div className="relative h-[500px] rounded-[2.5rem] overflow-hidden mb-6 shadow-xl">
                <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h3 className="text-2xl font-black mb-3">{item.title}</h3>
              <p className="text-text-muted font-medium leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Farm to Table - Our Philosophy */}
      <section className="py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-24">
          <div className="lg:w-1/2 relative">
             <div className="absolute -top-20 -left-20 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl" />
             <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl z-10">
                <Image src="/about-farm.png" alt="Farm to Table" fill className="object-cover" />
             </div>
             <div className="absolute -bottom-10 -right-10 glass-card p-8 rounded-3xl z-20 shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary-500 flex items-center justify-center">
                    <Leaf className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-black">100% Traceable</div>
                    <div className="text-xs font-bold text-text-muted uppercase tracking-widest">Know your farmer</div>
                  </div>
                </div>
             </div>
          </div>
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight">
              From the <span className="text-primary-500">Soil</span> to Your Soul
            </h2>
            <p className="text-lg text-text-muted leading-relaxed font-medium">
              We believe that good health starts with good soil. That's why we only partner with farmers who practice regenerative agriculture. No pesticides, no GMOs, just pure nature nurtured by time and care.
            </p>
            <div className="space-y-4">
              {[
                "Regenerative Organic Practices",
                "Fair Trade for All Farmers",
                "Zero Carbon Footprint Initiatives",
                "Soil-to-Soul Traceability"
              ].map((point, i) => (
                <div key={i} className="flex items-center gap-4 text-lg font-bold">
                  <CheckCircle2 className="w-6 h-6 text-primary-500 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Quality & Purity - The Standard */}
      <section className="py-32 bg-primary-950 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
           <Image src="/about-quality.png" alt="Quality" fill className="object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl space-y-8">
            <span className="text-primary-400 font-black uppercase tracking-[0.3em] text-sm">Our Golden Standard</span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
              Uncompromising <br /> <span className="text-primary-400">Purity</span>
            </h2>
            <p className="text-xl text-white/60 leading-relaxed font-medium">
              At MyNarenFoods, quality isn't a department—it's our foundation. Every grain of spice, every drop of oil, and every health mix is tested in certified laboratories to ensure it meets our strict "Pure Heart" criteria.
            </p>
            <div className="flex flex-wrap gap-8 pt-8">
              {[
                { icon: ShieldCheck, title: "Lab Tested", desc: "Certified purity" },
                { icon: Zap, title: "Fresh Batch", desc: "Weekly production" },
                { icon: Globe, title: "Eco Sourced", desc: "Global standards" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                    <item.icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <div className="font-bold">{item.title}</div>
                    <div className="text-xs text-white/40 uppercase tracking-widest">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Product Showcase - The Collection */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-6">
              Our <span className="text-primary-500">Collections</span>
            </h2>
            <p className="text-lg text-text-muted font-medium">
              Explore our curated range of organic essentials, each crafted with the same dedication to quality and health.
            </p>
          </div>
          <Link href="/categories">
            <button className="px-10 py-5 rounded-2xl border-2 border-primary-500 text-primary-500 font-black uppercase tracking-widest hover:bg-primary-500 hover:text-white transition-all flex items-center gap-3">
              Explore All <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        </div>
        
        <div className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Indian Masalas", icon: "🌶️", color: "bg-orange-500" },
            { title: "Malt Varieties", icon: "🥛", color: "bg-amber-500" },
            { title: "Gourmet Pantry", icon: "🍯", color: "bg-yellow-500" },
            { title: "Health Mixes", icon: "🥣", color: "bg-green-500" }
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className="p-10 rounded-[3rem] bg-section-bg border border-card-border hover:border-primary-500/30 transition-all group"
            >
              <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center text-4xl mb-8 shadow-xl", item.color + "/10 text-white")}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-black mb-4 group-hover:text-primary-500 transition-colors">{item.title}</h3>
              <p className="text-sm text-text-muted font-medium leading-relaxed">
                Authentic blends crafted to elevate your health and culinary experience.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. CTA - Join Us */}
      <section className="px-6 pb-32">
        <div className="max-w-7xl mx-auto rounded-[4rem] bg-primary-500 p-12 md:p-24 relative overflow-hidden text-center text-white">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
             <Image src="/about-farm.png" alt="CTA" fill className="object-cover" />
          </div>
          <div className="relative z-10 space-y-8">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight">
              Ready to Taste the <br /> <span className="text-primary-950">Pure Difference?</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto font-medium">
              Join thousands of families who have switched to a healthier, organic lifestyle with MyNarenFoods.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <Link href="/categories">
                <button className="px-12 py-6 rounded-[2rem] bg-white text-primary-600 font-black text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                  Shop All Products <ArrowRight className="w-6 h-6" />
                </button>
              </Link>
              <button className="px-12 py-6 rounded-[2rem] bg-primary-950 text-white font-black text-lg shadow-2xl hover:scale-105 active:scale-95 transition-all">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
