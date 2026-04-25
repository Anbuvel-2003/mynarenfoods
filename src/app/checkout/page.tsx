"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/Button";
import { createOrder, verifyPayment } from "@/actions/order";
import { useRouter } from "next/navigation";
import { ShieldCheck, MapPin, CreditCard, Loader2 } from "lucide-react";
import Script from "next/script";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items, router]);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address) return;

    setLoading(true);
    try {
      const orderData = await createOrder({
        items,
        address,
        total: totalPrice(),
      });

      const options = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "MyNarenFoods",
        description: "Premium Gourmet Purchase",
        order_id: orderData.orderId,
        handler: async function (response: any) {
          const result = await verifyPayment(response);
          if (result.success) {
            clearCart();
            router.push("/checkout/success");
          } else {
            router.push("/checkout/failure");
          }
        },
        prefill: {
          name: "John Doe",
          email: "john@example.com",
        },
        theme: {
          color: "#8b5cf6",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      
      <h1 className="text-4xl font-bold mb-12 text-center">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Shipping Information */}
        <div className="glass p-8 rounded-[2rem]">
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <MapPin className="w-6 h-6 mr-3 text-primary-400" /> Shipping Details
          </h2>
          <form id="checkout-form" onSubmit={handleCheckout} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 ml-1">Full Delivery Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Street address, Apartment, City, State, ZIP Code"
                className="input-field min-h-[120px] resize-none"
                required
              />
            </div>
            
            <div className="pt-8 border-t border-white/10">
              <h3 className="text-lg font-bold mb-4 flex items-center">
                <CreditCard className="w-5 h-5 mr-3 text-accent-400" /> Payment Method
              </h3>
              <div className="p-4 bg-white/5 border border-primary-500/30 rounded-2xl flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary-500/20 rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <p className="font-bold">Razorpay Secure</p>
                    <p className="text-xs text-white/40">Cards, Netbanking, UPI & Wallets</p>
                  </div>
                </div>
                <div className="w-4 h-4 rounded-full border-4 border-primary-500" />
              </div>
            </div>
          </form>
        </div>

        {/* Summary */}
        <div className="space-y-8">
          <div className="glass p-8 rounded-[2rem]">
            <h2 className="text-2xl font-bold mb-8 text-center md:text-left">Order Summary</h2>
            <div className="max-h-[300px] overflow-y-auto space-y-4 mb-8 pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold truncate max-w-[150px]">{item.name}</p>
                      <p className="text-xs text-white/40">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-4 pt-6 border-t border-white/10">
              <div className="flex justify-between text-sm text-white/60">
                <span>Subtotal</span>
                <span>${totalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-white/60">
                <span>GST (18%)</span>
                <span>${(totalPrice() * 0.18).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-xl font-bold">
                <span>Total Amount</span>
                <span className="text-accent-400">${(totalPrice() * 1.18).toFixed(2)}</span>
              </div>
            </div>

            <Button
              form="checkout-form"
              type="submit"
              size="lg"
              className="w-full mt-10 py-4 text-lg"
              disabled={loading || !address}
            >
              {loading ? (
                <span className="flex items-center space-x-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </span>
              ) : (
                `Pay Now - INR ${(totalPrice() * 1.18 * 85).toFixed(0)}` // Mocking INR conversion for Razorpay
              )}
            </Button>
            
            <p className="text-center text-xs text-white/40 mt-6">
              By clicking "Pay Now", you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
