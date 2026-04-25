"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Mail, Phone, MapPin, Send, MessageSquare, 
  Clock, Share2, Star, Quote, ArrowRight, Zap 
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen">
      
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="inline-block px-4 py-1.5 bg-primary-500/10 text-primary-500 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-primary-500/20">
              Get In Touch
            </span>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-8">
              Let&apos;s Start a <span className="text-primary-500">Conversation</span>
            </h1>
            <p className="text-xl text-text-muted font-medium leading-relaxed">
              Have questions about our organic process or want to place a bulk order? We&apos;re here to help you bring purity to your kitchen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Contact Form & Info */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Form Side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 blur-3xl rounded-full" />
              <form className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-2">Full Name</label>
                    <input type="text" placeholder="John Doe" className="w-full bg-section-bg border border-card-border rounded-2xl p-4 outline-none focus:border-primary-500 transition-all font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-2">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="w-full bg-section-bg border border-card-border rounded-2xl p-4 outline-none focus:border-primary-500 transition-all font-medium" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-2">Subject</label>
                  <select className="w-full bg-section-bg border border-card-border rounded-2xl p-4 outline-none focus:border-primary-500 transition-all font-medium appearance-none">
                    <option>General Inquiry</option>
                    <option>Bulk/Business Order</option>
                    <option>Product Feedback</option>
                    <option>Shipping Question</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-text-muted ml-2">Your Message</label>
                  <textarea rows={5} placeholder="How can we help you today?" className="w-full bg-section-bg border border-card-border rounded-2xl p-4 outline-none focus:border-primary-500 transition-all font-medium resize-none"></textarea>
                </div>
                <Button size="lg" className="w-full h-16 rounded-2xl text-base font-black uppercase tracking-widest shadow-xl shadow-primary-500/20">
                  Send Message <Send className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </motion.div>

            {/* Info Side */}
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { icon: Mail, title: "Email Us", info: "hello@mynarenfoods.com", sub: "24/7 Response Rate" },
                  { icon: Phone, title: "Call Us", info: "+91 98765 43210", sub: "Mon-Sat, 9am - 6pm" },
                  { icon: MapPin, title: "Office", info: "Pure Heart Organic Estate", sub: "Chennai, Tamil Nadu" },
                  { icon: Clock, title: "Working Hours", info: "09:00 AM - 07:00 PM", sub: "Sunday Closed" }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    className="p-8 rounded-3xl bg-section-bg border border-card-border hover:border-primary-500/30 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-6 group-hover:bg-primary-500 group-hover:text-white transition-all">
                      <item.icon className="w-6 h-6 text-primary-500 group-hover:text-white" />
                    </div>
                    <h3 className="font-black text-xs uppercase tracking-[0.2em] text-text-muted mb-2">{item.title}</h3>
                    <div className="text-lg font-bold mb-1">{item.info}</div>
                    <div className="text-xs font-medium text-text-muted">{item.sub}</div>
                  </motion.div>
                ))}
              </div>
              
              <div className="p-10 rounded-[3rem] bg-primary-950 text-white relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary-500/20 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />
                <div className="relative z-10 flex items-center gap-6">
                  <div className="w-20 h-20 rounded-3xl bg-white/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-10 h-10 text-primary-400" />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black mb-2 tracking-tight">Direct WhatsApp Support</h4>
                    <p className="text-white/60 text-sm font-medium mb-4">Chat with our experts for instant product help and organic advice.</p>
                    <button className="flex items-center gap-2 text-primary-400 font-bold hover:gap-4 transition-all">
                      Start Chat Now <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Immersive Map Section */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto h-[500px] rounded-[4rem] overflow-hidden relative shadow-2xl group">
          {/* Placeholder for Map with Premium look */}
          <div className="absolute inset-0 bg-[#111] flex items-center justify-center">
             <Image src="/about-farm.png" alt="Map Location" fill className="object-cover opacity-30 grayscale group-hover:scale-105 transition-transform duration-1000" />
             <div className="absolute inset-0 bg-gradient-to-t from-primary-950 via-transparent to-transparent" />
             <div className="relative z-10 text-center">
                <div className="w-20 h-20 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary-500/50 animate-pulse">
                  <MapPin className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-3xl font-black text-white tracking-tighter mb-2">Pure Heart Organic Estate</h3>
                <p className="text-white/60 font-medium">123 Green Valley, Organic District, Chennai</p>
                <button className="mt-8 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white font-bold hover:bg-white/20 transition-all uppercase tracking-widest text-xs">
                  Open in Google Maps
                </button>
             </div>
          </div>
        </div>
      </section>

      {/* 4. Product Promotions - Special Offers */}
      <section className="py-32 bg-section-bg">
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="max-w-2xl">
              <span className="text-primary-500 font-black uppercase tracking-[0.3em] text-xs">Exclusive Offers</span>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mt-4">
                Curated <span className="text-primary-500">Bundles</span> for You
              </h2>
            </div>
            <Link href="/categories">
              <button className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-primary-500 hover:gap-5 transition-all">
                Explore All Deals <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Promo 1 */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="relative h-[600px] rounded-[4rem] overflow-hidden shadow-2xl group"
          >
            <Image src="/promo-gift.png" alt="Gift Box" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 p-12 flex flex-col justify-end text-white">
              <div className="w-16 h-16 bg-accent-500 rounded-2xl flex items-center justify-center mb-6 shadow-xl">
                 <Zap className="w-8 h-8 text-white fill-white" />
              </div>
              <h3 className="text-4xl font-black mb-4 tracking-tighter">Artisan Gift Collection</h3>
              <p className="text-white/70 font-medium text-lg mb-8 max-w-md">Perfect for sharing health. Our signature gift box with hand-picked organic essentials.</p>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-black text-primary-400">₹1,499</span>
                <span className="text-white/40 line-through font-bold">₹1,999</span>
                <Button className="ml-auto rounded-2xl px-8 h-14 font-black uppercase tracking-widest text-xs">Order Now</Button>
              </div>
            </div>
          </motion.div>

          {/* Promo 2 */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="relative h-[600px] rounded-[4rem] overflow-hidden shadow-2xl group"
          >
            <Image src="/promo-combo.png" alt="Combo Deal" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute inset-0 p-12 flex flex-col justify-end text-white">
              <div className="inline-block px-4 py-1.5 bg-primary-500 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] mb-6 self-start">
                Best Seller
              </div>
              <h3 className="text-4xl font-black mb-4 tracking-tighter">Family Health Bundle</h3>
              <p className="text-white/70 font-medium text-lg mb-8 max-w-md">Everything your family needs for a week of pure, organic meals. Spices, grains, and health mixes.</p>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-black text-primary-400">₹2,899</span>
                <span className="text-white/40 line-through font-bold">₹3,499</span>
                <Button className="ml-auto rounded-2xl px-8 h-14 font-black uppercase tracking-widest text-xs">Claim Deal</Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. Testimonial Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/promo-testimonials.png" alt="Testimonials" fill className="object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">Real Stories, <span className="text-primary-500">Real Purity</span></h2>
            <p className="text-text-muted max-w-2xl mx-auto font-medium">Join 10,000+ families who have transformed their lives with our products.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                name: "Anjali Sharma", 
                role: "Nutritionist", 
                text: "The aroma of these hand-ground spices is incomparable. I recommend MyNarenFoods to all my clients who want real, untainted organic products.",
                stars: 5 
              },
              { 
                name: "Rahul Venkatesh", 
                role: "Parent of 2", 
                text: "My kids love the Herbal Malts! It's so reassuring to know they are drinking something 100% natural and free from industrial additives.",
                stars: 5 
              },
              { 
                name: "Dr. K. Mani", 
                role: "Ayurveda Practitioner", 
                text: "The traditional stone-ground method used here is vital for preserving the medicinal properties of herbs. Truly a Pure Heart brand.",
                stars: 5 
              }
            ].map((t, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="glass-card p-10 rounded-[3rem] relative group hover:border-primary-500/30 transition-all"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(t.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <Quote className="w-12 h-12 text-primary-500/10 absolute top-8 right-10 group-hover:text-primary-500/20 transition-all" />
                <p className="text-lg font-medium leading-relaxed mb-8 italic">&quot;{t.text}&quot;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-500/20 flex items-center justify-center font-black text-primary-500 uppercase tracking-tighter">
                    {t.name[0]}
                  </div>
                  <div>
                    <div className="font-black tracking-tight">{t.name}</div>
                    <div className="text-xs font-bold text-text-muted uppercase tracking-widest">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
