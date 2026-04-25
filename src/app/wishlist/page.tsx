"use client";

import Image from "next/image";
import Link from "next/link";
import { useWishlistStore } from "@/store/useWishlistStore";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/Button";
import { Heart, ShoppingCart, Trash2, ArrowRight } from "lucide-react";

export default function WishlistPage() {
  const { items, toggleItem } = useWishlistStore();
  const { addItem } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <Heart className="w-10 h-10 text-white/20" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Your wishlist is empty</h1>
        <p className="text-white/40 mb-8 max-w-md text-center">
          Save items you love to your wishlist and they'll appear here.
        </p>
        <Link href="/products">
          <Button size="lg">Explore Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-12">My Wishlist</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {items.map((item) => (
          <div key={item.id} className="group glass rounded-3xl overflow-hidden flex flex-col h-full">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <button
                onClick={() => toggleItem(item)}
                className="absolute top-4 right-4 p-2 bg-black/40 backdrop-blur-md rounded-full text-red-400 hover:bg-red-400/20 transition-all"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <div className="mb-4">
                <span className="text-xs font-bold text-primary-400 uppercase tracking-wider">{item.category}</span>
                <h3 className="font-bold text-lg mt-1">{item.name}</h3>
              </div>
              
              <div className="flex flex-col space-y-4 mt-auto">
                <p className="text-xl font-bold text-white">${item.price.toFixed(2)}</p>
                <Button 
                  onClick={() => {
                    addItem(item);
                    toggleItem(item); // Remove from wishlist when added to cart
                  }}
                  className="w-full rounded-xl"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" /> Add to Cart
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
