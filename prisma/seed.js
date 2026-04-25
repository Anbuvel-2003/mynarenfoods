const { PrismaClient } = require("@prisma/client");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");

const adapter = new PrismaBetterSqlite3({ url: "file:prisma/dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Create Categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { name: "Starters" },
      update: {},
      create: { name: "Starters" },
    }),
    prisma.category.upsert({
      where: { name: "Main Course" },
      update: {},
      create: { name: "Main Course" },
    }),
    prisma.category.upsert({
      where: { name: "Desserts" },
      update: {},
      create: { name: "Desserts" },
    }),
    prisma.category.upsert({
      where: { name: "Beverages" },
      update: {},
      create: { name: "Beverages" },
    }),
  ]);

  // Create Products
  const products = [
    {
      name: "Wild Truffle Risotto",
      description: "Exquisite Italian rice infused with premium black truffles and aged parmesan.",
      price: 45.0,
      categoryId: categories[1].id,
      images: "/hero-food.png",
      stock: 50,
    },
    {
      name: "Seared Scallops",
      description: "Jumbo Hokkaido scallops with saffron foam and caviar.",
      price: 38.0,
      categoryId: categories[0].id,
      images: "/hero-food.png",
      stock: 20,
    },
    {
      name: "Gold Leaf Chocolate Orb",
      description: "Valrhona dark chocolate shell with gold leaf and raspberry coulis.",
      price: 25.0,
      categoryId: categories[2].id,
      images: "/hero-food.png",
      stock: 15,
    },
    {
      name: "A5 Wagyu Tartare",
      description: "Hand-cut Miyazaki wagyu with quail egg and truffle shavings.",
      price: 65.0,
      categoryId: categories[1].id,
      images: "/hero-food.png",
      stock: 10,
    },
  ];

  // Clear existing products
  await prisma.product.deleteMany();

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
