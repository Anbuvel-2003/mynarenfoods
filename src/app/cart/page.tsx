"use client";

import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/Button";
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 text-white/20" />
        </div>
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-white/40 mb-8 max-w-md text-center">
          Looks like you haven't added anything to your cart yet. Explore our premium collection and find something exquisite.
        </p>
        <Link href="/products">
          <Button size="lg">Start Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-12 text-center md:text-left">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <div key={item.id} className="glass p-6 rounded-3xl flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-bold mb-1">{item.name}</h3>
                <p className="text-accent-400 font-bold mb-4">${item.price.toFixed(2)}</p>
                <div className="flex items-center justify-center sm:justify-start space-x-4">
                  <div className="flex items-center border border-white/10 rounded-xl p-1 bg-white/5">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg transition-all"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-lg transition-all"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-white/20 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="hidden sm:block text-right">
                <p className="text-xl font-bold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="glass p-8 rounded-[2rem] sticky top-28">
            <h2 className="text-2xl font-bold mb-8">Order Summary</h2>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-white/60">
                <span>Subtotal</span>
                <span>${totalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Shipping</span>
                <span className="text-primary-400 font-bold">FREE</span>
              </div>
              <div className="flex justify-between text-white/60">
                <span>Tax (GST 18%)</span>
                <span>${(totalPrice() * 0.18).toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t border-white/10 flex justify-between">
                <span className="text-xl font-bold">Total</span>
                <span className="text-2xl font-bold text-accent-400">
                  ${(totalPrice() * 1.18).toFixed(2)}
                </span>
              </div>
            </div>
            <Link href="/checkout">
              <Button size="lg" className="w-full py-4 text-lg">
                Proceed to Checkout <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <div className="mt-6 flex items-center justify-center space-x-2 text-white/40 text-xs">
              <ShoppingBag className="w-4 h-4" />
              <span>Secure checkout powered by Razorpay</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
