"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const ProductSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().min(10, "Description is too short"),
  price: z.number().positive("Price must be positive"),
  categoryId: z.string().min(1, "Category is required"),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  images: z.string().min(1, "At least one image URL is required"),
});

export async function createProduct(formData: FormData) {
  const session = await getSession();
  if (session?.role !== "ADMIN") throw new Error("Unauthorized");

  const validatedFields = ProductSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
    categoryId: formData.get("categoryId"),
    stock: Number(formData.get("stock")),
    images: formData.get("images"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  await prisma.product.create({
    data: validatedFields.data,
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");
  redirect("/admin/products");
}

export async function deleteProduct(id: string) {
  const session = await getSession();
  if (session?.role !== "ADMIN") throw new Error("Unauthorized");

  await prisma.product.delete({
    where: { id },
  });

  revalidatePath("/admin/products");
  revalidatePath("/products");
}
