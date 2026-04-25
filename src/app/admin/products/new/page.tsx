import { getCategories } from "@/lib/data";
import { createProduct } from "@/actions/product";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Package, DollarSign, Image as ImageIcon, Layers, Hash } from "lucide-react";
import Link from "next/link";

export default async function NewProductPage() {
  const categories = await getCategories();

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <Link href="/admin" className="flex items-center text-white/40 hover:text-white transition-colors mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </Link>

      <div className="glass p-8 rounded-[2rem]">
        <h1 className="text-3xl font-bold mb-2">Add New Product</h1>
        <p className="text-white/40 mb-10">Fill in the details to list a new gourmet item.</p>

        <form action={createProduct} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 ml-1">Product Name</label>
              <div className="relative">
                <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input name="name" type="text" placeholder="e.g. Wild Truffle Risotto" className="input-field pl-12" required />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 ml-1">Description</label>
              <textarea name="description" placeholder="Describe the flavors, origins, and ingredients..." className="input-field min-h-[120px] resize-none" required />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 ml-1">Price (USD)</label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input name="price" type="number" step="0.01" placeholder="0.00" className="input-field pl-12" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 ml-1">Category</label>
              <div className="relative">
                <Layers className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <select name="categoryId" className="input-field pl-12 appearance-none" required>
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 ml-1">Stock Quantity</label>
              <div className="relative">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input name="stock" type="number" placeholder="0" className="input-field pl-12" required />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2 ml-1">Image URLs (comma separated)</label>
              <div className="relative">
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input name="images" type="text" placeholder="https://example.com/image1.png, https://..." className="input-field pl-12" required />
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 flex gap-4">
            <Button type="submit" className="flex-1 py-4 text-lg rounded-2xl">
              Create Product
            </Button>
            <Link href="/admin" className="flex-1">
              <Button type="button" variant="outline" className="w-full py-4 text-lg rounded-2xl">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
