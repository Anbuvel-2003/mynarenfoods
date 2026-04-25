"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ShoppingCart, Heart, User, Search, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "./ui/Button";
import { cn } from "@/utils/cn";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

export const Navbar = ({ session }: { session: any }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  const cartItems = useCartStore((state) => state.totalItems());
  const wishlistItems = useWishlistStore((state) => state.items.length);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Categories", href: "/categories" },
    { name: "Contact", href: "/contact" },
  ];

  if (!mounted) return null;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
        isScrolled 
          ? "bg-background/80 backdrop-blur-xl border-b border-card-border shadow-sm py-2" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 shrink-0 group">
          <div className="relative w-10 h-10 overflow-hidden rounded-xl border border-primary-500/30 group-hover:border-primary-500 transition-all group-hover:shadow-lg group-hover:shadow-primary-500/20">
            <Image 
              src="/logo.png" 
              alt="MyNarenFoods" 
              fill 
              className="object-cover p-0.5"
            />
          </div>
          <span className="text-xl font-bold tracking-tight transition-colors">
            MyNaren<span className="text-primary-500">Foods</span>
          </span>
        </Link>

        {/* Center: Search Bar & Nav Links */}
        <div className="hidden lg:flex flex-1 items-center justify-between max-w-3xl">
          <div className="flex items-center space-x-6 mr-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-foreground/70 hover:text-primary-500 transition-colors whitespace-nowrap"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary-500 transition-colors" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-section-bg border border-card-border rounded-full py-2.5 pl-11 pr-4 text-sm outline-none focus:border-primary-500/50 focus:ring-4 focus:ring-primary-500/10 transition-all"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2.5 rounded-full hover:bg-section-bg transition-colors"
          >
            {theme === "dark" ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
          </button>

          <Link href="/wishlist">
            <button className="p-2.5 rounded-full hover:bg-section-bg transition-colors relative group">
              <Heart className={cn("w-5 h-5 transition-colors group-hover:text-accent-500", wishlistItems > 0 && "text-accent-500 fill-accent-500")} />
              {wishlistItems > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-accent-500 rounded-full border-2 border-background" />
              )}
            </button>
          </Link>

          <Link href="/cart">
            <button className="p-2.5 rounded-full hover:bg-section-bg transition-colors relative group">
              <ShoppingCart className="w-5 h-5 group-hover:text-primary-500 transition-colors" />
              {cartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-background">
                  {cartItems}
                </span>
              )}
            </button>
          </Link>
          
          <Link href={session ? "/profile" : "/login"}>
            <button className="flex items-center space-x-2 p-1.5 pr-3 rounded-full bg-section-bg hover:bg-primary-500/10 transition-all group">
              <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center">
                <User className="w-4 h-4 text-primary-500" />
              </div>
              <span className="text-xs font-semibold hidden sm:block">
                {session ? "Account" : "Sign In"}
              </span>
            </button>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2.5 rounded-full hover:bg-section-bg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-background border-b border-card-border p-6 flex flex-col space-y-6 animate-slide-up shadow-2xl">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-section-bg border border-card-border rounded-2xl py-4 pl-12 pr-4 outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-4 rounded-2xl bg-section-bg text-center font-bold hover:bg-primary-500/10 hover:text-primary-500 transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
