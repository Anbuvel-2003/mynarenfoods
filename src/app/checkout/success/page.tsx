import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { CheckCircle, ShoppingBag, ArrowRight } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center">
      <div className="w-24 h-24 bg-emerald-400/20 rounded-full flex items-center justify-center mb-8 animate-scale-in">
        <CheckCircle className="w-12 h-12 text-emerald-400" />
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-xl text-white/60 mb-10 max-w-lg">
        Thank you for your purchase. Your order has been placed and is being processed by our culinary experts.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <Link href="/profile/orders">
          <Button size="lg" variant="outline">
            View My Orders
          </Button>
        </Link>
        <Link href="/products">
          <Button size="lg">
            Continue Shopping <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
      </div>
      <div className="mt-12 p-6 glass rounded-3xl max-w-md">
        <div className="flex items-center space-x-3 text-sm font-medium mb-2">
          <ShoppingBag className="w-5 h-5 text-primary-400" />
          <span>Order Confirmation</span>
        </div>
        <p className="text-white/40 text-xs">
          A confirmation email has been sent to your registered email address. You can track your order status in your profile.
        </p>
      </div>
    </div>
  );
}
