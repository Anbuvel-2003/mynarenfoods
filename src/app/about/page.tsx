import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Utensils, Globe, Heart, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="/hero-food.png"
          alt="Gourmet Dining"
          fill
          className="object-cover brightness-[0.3]"
        />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Our Culinary <span className="text-primary-400">Legacy</span></h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Crafting exquisite experiences for the modern epicurean since 2010.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-8">The MynarenFoods Story</h2>
          <div className="space-y-6 text-lg text-white/60">
            <p>
              It started with a simple belief: that fine dining shouldn't be confined to the walls of a Michelin-star restaurant. Our founder, a visionary chef with a passion for global flavors, set out to bring the world's most exquisite ingredients to every home.
            </p>
            <p>
              Today, MynarenFoods stands as a beacon of culinary excellence, sourcing directly from local artisans in Italy, France, and Japan. Every product in our collection is handpicked, tested, and certified for its uncompromising quality.
            </p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8">
            <div>
              <p className="text-4xl font-bold text-primary-400">500+</p>
              <p className="text-white/40 uppercase tracking-widest text-xs mt-2 font-bold">Curated Products</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-accent-400">50k+</p>
              <p className="text-white/40 uppercase tracking-widest text-xs mt-2 font-bold">Happy Foodies</p>
            </div>
          </div>
        </div>
        <div className="relative aspect-square glass rounded-full overflow-hidden border-4 border-primary-500/20 p-8">
          <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl">
            <Image
              src="/logo.png"
              alt="MyNarenFoods Official Logo"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-16">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Utensils className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Authenticity</h3>
              <p className="text-white/40 text-sm">True flavors, zero compromises.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-accent-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="w-8 h-8 text-accent-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Global Sourcing</h3>
              <p className="text-white/40 text-sm">Directly from the source.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-primary-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Passion</h3>
              <p className="text-white/40 text-sm">Driven by culinary love.</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-accent-500/20 rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-8 h-8 text-accent-400" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality First</h3>
              <p className="text-white/40 text-sm">Rigorous testing standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">
        <div className="glass max-w-4xl mx-auto p-16 rounded-[4rem]">
          <h2 className="text-4xl font-bold mb-6">Ready to Taste the Extraordinary?</h2>
          <p className="text-xl text-white/60 mb-10">Join thousands of food lovers and start your journey today.</p>
          <Link href="/products">
            <Button size="lg" className="px-12 py-4 text-lg">
              Start Shopping <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
