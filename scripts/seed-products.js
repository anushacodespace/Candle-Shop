// scripts/seed-products.js
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017";
const DB_NAME = "candle_shop";

const scents = [
  "Lavender", "Rose", "Vanilla", "Jasmine", "Sandalwood",
  "Cinnamon", "Lemon", "Orange", "Mint", "Ocean Breeze",
];

function generateProducts(count = 50) {
  const products = [];

  for (let i = 1; i <= count; i++) {
    const scent = scents[i % scents.length];

    products.push({
      name: `${scent} Candle ${i}`,
      slug: `${scent.toLowerCase().replace(" ", "-")}-candle-${i}`,
      price: 299 + (i % 5) * 100,
      description: `Premium handmade ${scent.toLowerCase()} scented candle.`,
      image: `/images/lavender.jpg`, // reuse same image for now
      stock: 10 + (i % 20),
      category: "Candles",
      createdAt: new Date(),
    });
  }

  return products;
}

async function seed() {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db(DB_NAME);
    const collection = db.collection("products");

    const products = generateProducts(50);

    // Optional: clear old products
    await collection.deleteMany({});
    console.log("🧹 Old products removed");

    const result = await collection.insertMany(products);
    console.log(`🔥 ${result.insertedCount} products inserted`);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    await client.close();
    process.exit();
  }
}

seed();
