import Image from "next/image";
import Link from "next/link";
import { getProducts, getCategories } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { Star, ShoppingCart, Heart, Filter } from "lucide-react";

export default async function ProductsPage() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2">Our Collection</h1>
          <p className="text-white/60">Discover the finest gourmet selections from around the world.</p>
        </div>
        <div className="mt-6 md:mt-0 flex items-center space-x-4">
          <Button variant="outline" size="sm" className="rounded-xl">
            <Filter className="w-4 h-4 mr-2" /> Filter
          </Button>
          <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none focus:border-primary-500 transition-all">
            <option>Latest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Categories Sidebar (Desktop) */}
        <div className="hidden lg:block space-y-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Categories</h3>
            <div className="space-y-2">
              <button className="block w-full text-left px-4 py-2 rounded-xl bg-primary-500/20 text-primary-400 font-bold">
                All Products
              </button>
              {categories.map((cat) => (
                <button key={cat.id} className="block w-full text-left px-4 py-2 rounded-xl hover:bg-white/5 transition-colors">
                  {cat.name} <span className="text-white/40 text-sm float-right">({cat._count.products})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group glass rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-300 flex flex-col">
              <Link href={`/products/${product.id}`} className="block relative aspect-square overflow-hidden">
                <Image
                  src={product.images.split(',')[0]}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span className="text-xs font-bold">4.8</span>
                </div>
                <button className="absolute top-4 left-4 p-2 bg-black/40 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-400">
                  <Heart className="w-5 h-5" />
                </button>
              </Link>

              <div className="p-6 flex-1 flex flex-col">
                <div className="mb-2">
                  <span className="text-xs font-bold text-primary-400 uppercase tracking-wider">{product.category.name}</span>
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-bold text-xl group-hover:text-primary-400 transition-colors">{product.name}</h3>
                  </Link>
                </div>
                <p className="text-white/50 text-sm mb-6 flex-1 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="text-2xl font-bold text-white">${product.price.toFixed(2)}</span>
                  <Button size="sm" className="rounded-xl px-4">
                    <ShoppingCart className="w-4 h-4 mr-2" /> Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
