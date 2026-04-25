import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, Globe, Send, Camera, MessageCircle, Share, Rss } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-section-bg border-t border-card-border pt-24 pb-12">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          {/* Brand & Info */}
          <div className="space-y-8">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative w-14 h-14 overflow-hidden rounded-2xl border-2 border-primary-500/30 group-hover:border-primary-500 transition-all group-hover:shadow-lg group-hover:shadow-primary-500/20">
                <Image 
                  src="/logo.png" 
                  alt="MyNarenFoods" 
                  fill 
                  className="object-cover p-1"
                />
              </div>
              <div>
                <span className="text-2xl font-bold block leading-tight tracking-tighter">
                  MyNaren<span className="text-primary-500">Foods</span>
                </span>
                <span className="text-[10px] text-primary-500 font-black uppercase tracking-[0.2em]">Pure Heart Organic</span>
              </div>
            </Link>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              Sourcing the world&apos;s finest organic ingredients and artisan products for the modern kitchen. Quality you can taste, service you can trust.
            </p>
            <div className="flex items-center space-x-3">
              {[Globe, MessageCircle, Share, Rss].map((Icon, i) => (
                <Link key={i} href="#" className="w-10 h-10 rounded-xl bg-card-bg flex items-center justify-center hover:bg-primary-500 hover:text-white transition-all transform hover:scale-110 border border-card-border">
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-8 tracking-tight">Quick Links</h4>
            <ul className="space-y-4">
              <li><Link href="/products" className="text-sm text-text-muted hover:text-primary-500 transition-colors">All Products</Link></li>
              <li><Link href="/deals" className="text-sm text-text-muted hover:text-primary-500 transition-colors">Exclusive Deals</Link></li>
              <li><Link href="/about" className="text-sm text-text-muted hover:text-primary-500 transition-colors">Our Story</Link></li>
              <li><Link href="/contact" className="text-sm text-text-muted hover:text-primary-500 transition-colors">Contact Us</Link></li>
              <li><Link href="/faq" className="text-sm text-text-muted hover:text-primary-500 transition-colors">Help & FAQ</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-bold mb-8 tracking-tight">Categories</h4>
            <ul className="space-y-4">
              <li><Link href="/categories/electronics" className="text-sm text-text-muted hover:text-primary-500 transition-colors">Electronics</Link></li>
              <li><Link href="/categories/fashion" className="text-sm text-text-muted hover:text-primary-500 transition-colors">Fashion</Link></li>
              <li><Link href="/categories/grocery" className="text-sm text-text-muted hover:text-primary-500 transition-colors">Grocery</Link></li>
              <li><Link href="/categories/beauty" className="text-sm text-text-muted hover:text-primary-500 transition-colors">Beauty</Link></li>
              <li><Link href="/categories/furniture" className="text-sm text-text-muted hover:text-primary-500 transition-colors">Furniture</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-8">
            <h4 className="text-lg font-bold tracking-tight">Newsletter</h4>
            <p className="text-sm text-text-muted">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-card-bg border border-card-border rounded-2xl py-4 pl-4 pr-12 outline-none focus:border-primary-500 transition-colors"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary-500 text-white rounded-xl flex items-center justify-center hover:bg-primary-600 transition-colors">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-card-border flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-text-muted text-xs">
              &copy; {new Date().getFullYear()} MyNarenFoods. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-xs text-text-muted hover:text-foreground">Privacy Policy</Link>
              <Link href="/terms" className="text-xs text-text-muted hover:text-foreground">Terms of Service</Link>
            </div>
          </div>
          <div className="flex items-center space-x-6 opacity-40 grayscale">
            <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" width={60} height={20} />
            <Image src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" width={40} height={15} />
            <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" width={35} height={20} />
          </div>
        </div>
      </div>
    </footer>
  );
};
