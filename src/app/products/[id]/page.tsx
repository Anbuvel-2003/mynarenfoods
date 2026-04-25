import Image from "next/image";
import { getProductById } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Star, ShoppingCart, Heart, ShieldCheck, Truck, RefreshCw } from "lucide-react";
import { notFound } from "next/navigation";

export default async function ProductDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square glass rounded-[2rem] overflow-hidden">
            <Image
              src={product.images.split(',')[0]}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="relative aspect-square glass rounded-2xl overflow-hidden cursor-pointer hover:border-primary-500 transition-all">
                <Image
                  src={product.images.split(',')[0]}
                  alt="Gallery"
                  fill
                  className="object-cover opacity-60 hover:opacity-100"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-8">
            <span className="text-primary-400 font-bold uppercase tracking-widest text-sm">{product.category.name}</span>
            <h1 className="text-4xl md:text-5xl font-bold mt-2 mb-4">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center text-yellow-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className={`w-5 h-5 ${i === 5 ? 'text-white/20' : 'fill-current'}`} />
                ))}
              </div>
              <span className="text-white/40 text-sm">(24 Customer Reviews)</span>
            </div>
            <p className="text-3xl font-bold text-accent-400 mb-6">${product.price.toFixed(2)}</p>
            <p className="text-white/60 text-lg leading-relaxed">{product.description}</p>
          </div>

          <div className="space-y-6 mb-12">
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-white/10 rounded-2xl p-1 bg-white/5">
                <button className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-xl transition-all">-</button>
                <span className="w-12 text-center font-bold">1</span>
                <button className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-xl transition-all">+</button>
              </div>
              <Button size="lg" className="flex-1 rounded-2xl">
                <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
              </Button>
              <button className="p-4 border border-white/10 rounded-2xl hover:bg-red-400/10 hover:text-red-400 transition-all">
                <Heart className="w-6 h-6" />
              </button>
            </div>
            <p className="text-sm text-white/40">Only {product.stock} items left in stock!</p>
          </div>

          {/* Delivery & Security Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-white/10">
            <div className="flex flex-col items-center text-center">
              <Truck className="w-6 h-6 text-primary-400 mb-2" />
              <span className="text-xs font-medium">Free Delivery</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <ShieldCheck className="w-6 h-6 text-primary-400 mb-2" />
              <span className="text-xs font-medium">Secure Payment</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <RefreshCw className="w-6 h-6 text-primary-400 mb-2" />
              <span className="text-xs font-medium">7 Days Return</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
