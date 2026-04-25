"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useCallback, useRef } from "react";
import { 
  ArrowRight, Star, ShieldCheck, Truck, Clock, 
  CreditCard, Heart, ShoppingCart, Eye, ChevronLeft, ChevronRight,
  Pause, Play
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";

// --- Hero Slides ---
const heroSlides = [
  {
    image: "/hero-banner-1.png",
    tag: "Seasonal Collection 2026",
    title: "Biggest Sale of the Season",
    highlight: "Sale",
    subtitle: "Get up to 50% OFF on premium organic produce and luxury gourmet delights.",
    cta1: "Shop Now",
    cta2: "Explore Deals",
  },
  {
    image: "/hero-banner-2.png",
    tag: "Farm Fresh",
    title: "Fresh From the Farm to You",
    highlight: "Farm",
    subtitle: "100% organic, handpicked vegetables delivered fresh to your doorstep every morning.",
    cta1: "Order Fresh",
    cta2: "View Products",
  },
  {
    image: "/hero-banner-3.png",
    tag: "Gourmet Collection",
    title: "Artisan Gourmet Essentials",
    highlight: "Gourmet",
    subtitle: "Discover premium cheeses, olive oils, and artisan breads from around the world.",
    cta1: "Explore Now",
    cta2: "Learn More",
  },
];

// --- Mock Data ---
const categories = [
  { name: "Electronics", icon: "📱", color: "bg-blue-500/10 text-blue-500" },
  { name: "Fashion", icon: "👕", color: "bg-purple-500/10 text-purple-500" },
  { name: "Grocery", icon: "🍎", color: "bg-green-500/10 text-green-500" },
  { name: "Beauty", icon: "💄", color: "bg-pink-500/10 text-pink-500" },
  { name: "Furniture", icon: "🪑", color: "bg-amber-500/10 text-amber-500" },
  { name: "Sports", icon: "⚽", color: "bg-red-500/10 text-red-500" },
  { name: "Health", icon: "🏥", color: "bg-teal-500/10 text-teal-500" },
  { name: "Books", icon: "📚", color: "bg-indigo-500/10 text-indigo-500" },
];

const offerProducts = [
  { id: 1, name: "Premium White Truffle Oil", price: 45, originalPrice: 60, rating: 4.9, discount: 25, image: "/product_truffle_oil_1777102262804.png" },
  { id: 2, name: "Organic Himalayan Salt", price: 12, originalPrice: 18, rating: 4.8, discount: 33, image: "/hero-food.png" },
  { id: 3, name: "Artisan Sourdough Bread", price: 8, originalPrice: 12, rating: 4.7, discount: 33, image: "/hero-food.png" },
  { id: 4, name: "Cold Pressed Olive Oil", price: 35, originalPrice: 45, rating: 5.0, discount: 22, image: "/hero-food.png" },
];

const latestProducts = [
  { id: 5, name: "Aged Balsamic Vinegar", price: 28, rating: 4.6, image: "/hero-food.png" },
  { id: 6, name: "Wildflower Honey", price: 15, rating: 4.9, image: "/hero-food.png" },
  { id: 7, name: "Organic Quinoa", price: 10, rating: 4.5, image: "/hero-food.png" },
  { id: 8, name: "Dark Roasted Coffee", price: 22, rating: 4.8, image: "/hero-food.png" },
];

// --- Components ---

const ProductCard = ({ product, showQuickView = false }: { product: any, showQuickView?: boolean }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="group relative card-premium overflow-hidden"
  >
    <div className="aspect-square relative overflow-hidden bg-section-bg">
      <Image
        src={product.image || "/hero-food.png"}
        alt={product.name}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-700"
      />
      
      {product.discount && (
        <div className="absolute top-4 left-4 bg-accent-500 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg">
          -{product.discount}% OFF
        </div>
      )}

      <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300">
        <button className="p-2 rounded-full bg-white/90 dark:bg-black/80 shadow-md hover:bg-primary-500 hover:text-white transition-all">
          <Heart className="w-4 h-4" />
        </button>
        {showQuickView && (
          <button className="p-2 rounded-full bg-white/90 dark:bg-black/80 shadow-md hover:bg-primary-500 hover:text-white transition-all">
            <Eye className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="absolute inset-x-4 bottom-4 translate-y-16 group-hover:translate-y-0 transition-transform duration-300">
        <Button className="w-full shadow-xl">
          <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
        </Button>
      </div>
    </div>

    <div className="p-5">
      <div className="flex items-center gap-1 mb-2">
        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
        <span className="text-xs font-bold">{product.rating}</span>
      </div>
      <h3 className="font-bold text-foreground mb-1 line-clamp-1 group-hover:text-primary-500 transition-colors">
        {product.name}
      </h3>
      <div className="flex items-center gap-2">
        <span className="text-lg font-bold text-primary-500">${product.price.toFixed(2)}</span>
        {product.originalPrice && (
          <span className="text-sm text-text-muted line-through">${product.originalPrice.toFixed(2)}</span>
        )}
      </div>
    </div>
  </motion.div>
);

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ h: 24, m: 0, s: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-3">
      {[
        { label: "HRS", value: timeLeft.h },
        { label: "MIN", value: timeLeft.m },
        { label: "SEC", value: timeLeft.s }
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center">
          <div className="w-16 h-16 glass-card rounded-2xl flex items-center justify-center text-2xl font-bold">
            {item.value.toString().padStart(2, '0')}
          </div>
          <span className="text-[10px] font-bold mt-2 tracking-widest text-text-muted">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

// --- Hero Carousel ---
const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = heroSlides.length;

  const goTo = useCallback((index: number) => {
    setCurrent((index + total) % total);
  }, [total]);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-advance
  useEffect(() => {
    if (isAutoPlaying) {
      timerRef.current = setInterval(next, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying, next]);

  // Reset timer on manual navigation
  const handleManual = (action: () => void) => {
    if (timerRef.current) clearInterval(timerRef.current);
    action();
    if (isAutoPlaying) {
      timerRef.current = setInterval(next, 5000);
    }
  };

  const slide = heroSlides[current];
  const titleParts = slide.title.split(slide.highlight);

  return (
    <section className="relative h-[90vh] flex items-center overflow-hidden">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={current === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-2 bg-primary-500/10 text-primary-500 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-primary-500/20">
              {slide.tag}
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter text-foreground leading-[0.9]">
              {titleParts[0]}<span className="text-primary-500">{slide.highlight}</span>{titleParts[1]}
            </h1>
            <p className="text-lg md:text-xl text-text-muted mb-10 max-w-lg">
              {slide.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="px-10 h-14 text-lg">
                {slide.cta1} <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-10 h-14 text-lg border-2 border-primary-500 text-primary-500">
                {slide.cta2}
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev / Next Arrows */}
      <button
        onClick={() => handleManual(prev)}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all group"
      >
        <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>
      <button
        onClick={() => handleManual(next)}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all group"
      >
        <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Bottom Controls: Dots + Autoplay Toggle */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        <div className="flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => handleManual(() => goTo(i))}
              className={cn(
                "h-2 rounded-full transition-all duration-500",
                current === i ? "w-10 bg-primary-500" : "w-2 bg-foreground/20 hover:bg-foreground/40"
              )}
            />
          ))}
        </div>
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all"
        >
          {isAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 ml-0.5" />}
        </button>
      </div>

      {/* Slide Counter */}
      <div className="absolute top-8 right-8 z-20 glass rounded-full px-4 py-2 text-xs font-bold tracking-widest">
        {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>
    </section>
  );
};

export default function Home() {
  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Category Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-bold mb-2 tracking-tight">Explore Categories</h2>
              <p className="text-text-muted">Find exactly what you need with ease</p>
            </div>
            <Link href="/categories" className="text-primary-500 font-bold flex items-center hover:underline">
              View All <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
          
          <div className="flex overflow-x-auto gap-6 pb-6 no-scrollbar">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="flex-shrink-0 group cursor-pointer"
              >
                <div className={cn(
                  "w-24 h-24 sm:w-32 sm:h-32 glass-card rounded-3xl flex flex-col items-center justify-center gap-3 transition-all duration-300 group-hover:translate-y-[-8px] shadow-sm",
                  cat.color
                )}>
                  <span className="text-3xl sm:text-4xl group-hover:scale-125 transition-transform">{cat.icon}</span>
                  <span className="text-xs sm:text-sm font-bold text-foreground">{cat.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Offer Products Section */}
      <section className="py-24 bg-section-bg rounded-[3rem] mx-4 md:mx-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 text-center md:text-left">
            <div>
              <h2 className="text-4xl font-bold mb-4 tracking-tight">Flash Sale Offers</h2>
              <p className="text-text-muted">Grab these deals before they disappear</p>
            </div>
            <div className="glass-card p-4 rounded-3xl">
              <CountdownTimer />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {offerProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Products Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 tracking-tight">New Arrivals</h2>
            <p className="text-text-muted">Freshly curated products just for you</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {latestProducts.map(p => (
              <ProductCard key={p.id} product={p} showQuickView />
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button variant="outline" size="lg" className="rounded-2xl px-12 border-primary-500 text-primary-500">View Collection</Button>
          </div>
        </div>
      </section>

      {/* Promo Banner Mid */}
      <section className="px-4 md:px-6 pb-24">
        <div className="max-w-7xl mx-auto relative rounded-[3rem] overflow-hidden min-h-[400px] flex items-center">
          <Image
            src="/hero-banner-2.png"
            alt="Promo"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary-950/90 via-primary-950/60 to-transparent" />
          <div className="relative z-10 p-12 md:p-24 text-white max-w-3xl">
            <span className="inline-block px-4 py-1.5 bg-primary-500/20 text-primary-300 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-primary-500/20">
              Limited Time
            </span>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter">
              Exclusive <br /> Gourmet Box
            </h2>
            <p className="text-lg text-white/70 mb-10 max-w-md">
              Hand-picked selection of our finest artisan products, delivered in a premium gift box.
            </p>
            <Button size="lg" className="bg-white text-primary-950 hover:bg-primary-100 rounded-2xl h-14 px-10 font-bold">
              Claim Offer Now
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 bg-section-bg border-y border-card-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Truck, title: "Free Shipping", desc: "On orders over $100" },
              { icon: ShieldCheck, title: "Secure Payment", desc: "100% secure checkout" },
              { icon: Clock, title: "24/7 Support", desc: "Dedicated gourmet help" },
              { icon: CreditCard, title: "Easy Returns", desc: "30-day money back guarantee" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-6 group glass-card p-6">
                <div className="w-14 h-14 rounded-2xl bg-primary-500/10 flex items-center justify-center shrink-0 group-hover:bg-primary-500 group-hover:text-white transition-all">
                  <item.icon className="w-7 h-7 text-primary-500 group-hover:text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                  <p className="text-sm text-text-muted">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
