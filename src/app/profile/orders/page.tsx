import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Package, Clock, CheckCircle, Truck, XCircle } from "lucide-react";
import Image from "next/image";

export default async function OrdersPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const orders = await prisma.order.findMany({
    where: { userId: session.userId as string },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "PENDING": return <Clock className="w-5 h-5 text-yellow-400" />;
      case "PROCESSING": return <Package className="w-5 h-5 text-blue-400" />;
      case "SHIPPED": return <Truck className="w-5 h-5 text-primary-400" />;
      case "DELIVERED": return <CheckCircle className="w-5 h-5 text-emerald-400" />;
      case "CANCELLED": return <XCircle className="w-5 h-5 text-red-400" />;
      default: return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-12">My Orders</h1>

      {orders.length === 0 ? (
        <div className="glass p-12 rounded-[2rem] text-center">
          <Package className="w-16 h-16 text-white/10 mx-auto mb-6" />
          <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
          <p className="text-white/40">Once you place an order, it will appear here.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order.id} className="glass overflow-hidden rounded-[2rem]">
              <div className="p-6 bg-white/5 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-6 text-sm">
                  <div>
                    <p className="text-white/40 uppercase tracking-wider text-[10px] font-bold">Order Placed</p>
                    <p className="font-bold">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-white/40 uppercase tracking-wider text-[10px] font-bold">Total</p>
                    <p className="font-bold text-accent-400">${order.totalAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-white/40 uppercase tracking-wider text-[10px] font-bold">Ship To</p>
                    <p className="font-bold truncate max-w-[100px]">{order.address}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-xl">
                  {getStatusIcon(order.status)}
                  <span className="font-bold text-sm uppercase tracking-tight">{order.status}</span>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-6">
                    <div className="relative w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                      <Image src={item.product.images.split(',')[0]} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg">{item.product.name}</h4>
                      <p className="text-white/40 text-sm">Quantity: {item.quantity}</p>
                      <p className="font-bold text-primary-400 mt-1">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
