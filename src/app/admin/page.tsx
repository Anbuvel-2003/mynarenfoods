import { getProducts } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/Button";
import { Plus, Package, ShoppingCart, DollarSign, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

export default async function AdminDashboard() {
  const products = await getProducts();
  const ordersCount = await prisma.order.count();
  const usersCount = await prisma.user.count();
  const totalSales = await prisma.order.aggregate({
    _sum: { totalAmount: true },
    where: { paymentStatus: "PAID" },
  });

  const stats = [
    { name: "Total Sales", value: `$${(totalSales._sum.totalAmount || 0).toFixed(2)}`, icon: DollarSign, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { name: "Orders", value: ordersCount.toString(), icon: ShoppingCart, color: "text-primary-400", bg: "bg-primary-400/10" },
    { name: "Customers", value: usersCount.toString(), icon: Users, color: "text-accent-400", bg: "bg-accent-400/10" },
    { name: "Active Products", value: products.length.toString(), icon: Package, color: "text-blue-400", bg: "bg-blue-400/10" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <Link href="/admin/products/new">
          <Button className="rounded-xl">
            <Plus className="w-5 h-5 mr-2" /> Add Product
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat) => (
          <div key={stat.name} className="glass p-6 rounded-3xl">
            <div className={`w-12 h-12 ${stat.bg} rounded-2xl flex items-center justify-center mb-4`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <p className="text-white/40 text-sm font-medium">{stat.name}</p>
            <p className="text-3xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Recent Products List */}
        <div className="lg:col-span-2 glass p-8 rounded-[2rem]">
          <h2 className="text-2xl font-bold mb-8">Recent Products</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-white/40 border-b border-white/10">
                  <th className="pb-4 font-medium">Product</th>
                  <th className="pb-4 font-medium">Category</th>
                  <th className="pb-4 font-medium">Price</th>
                  <th className="pb-4 font-medium">Stock</th>
                  <th className="pb-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {products.slice(0, 5).map((product) => (
                  <tr key={product.id} className="group">
                    <td className="py-4 flex items-center space-x-3">
                      <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                        <Image src={product.images.split(',')[0]} alt={product.name} fill className="object-cover" />
                      </div>
                      <span className="font-bold">{product.name}</span>
                    </td>
                    <td className="py-4 text-white/60">{product.category.name}</td>
                    <td className="py-4 font-bold text-accent-400">${product.price.toFixed(2)}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.stock < 15 ? 'bg-red-400/10 text-red-400' : 'bg-emerald-400/10 text-emerald-400'}`}>
                        {product.stock} in stock
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <Button variant="ghost" size="sm" className="hover:text-primary-400">Edit</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-8 text-center">
            <Link href="/admin/products" className="text-primary-400 hover:underline font-bold text-sm">View All Products</Link>
          </div>
        </div>

        {/* Quick Analytics */}
        <div className="glass p-8 rounded-[2rem]">
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <TrendingUp className="w-6 h-6 mr-3 text-emerald-400" /> Sales Trends
          </h2>
          <div className="space-y-6">
            <div className="p-4 bg-white/5 rounded-2xl">
              <p className="text-sm text-white/40 mb-1">Today's Revenue</p>
              <p className="text-2xl font-bold">$1,245.00</p>
              <div className="w-full bg-white/10 h-1.5 rounded-full mt-4">
                <div className="bg-emerald-400 h-full w-[65%] rounded-full shadow-[0_0_10px_#34d399]" />
              </div>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl">
              <p className="text-sm text-white/40 mb-1">Weekly Target</p>
              <p className="text-2xl font-bold">$8,000.00</p>
              <div className="w-full bg-white/10 h-1.5 rounded-full mt-4">
                <div className="bg-primary-500 h-full w-[40%] rounded-full shadow-[0_0_10px_#8b5cf6]" />
              </div>
            </div>
          </div>
          <div className="mt-12">
            <h3 className="font-bold mb-4">Top Categories</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/60">Main Course</span>
                <span className="font-bold">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Desserts</span>
                <span className="font-bold">30%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Starters</span>
                <span className="font-bold">25%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Subcomponent for Image (using Next.js Image)
import Image from "next/image";
