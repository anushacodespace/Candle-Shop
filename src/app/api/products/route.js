// src/app/api/products/route.js
import connectDB from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const { db } = await connectDB();

    // 👉 Single product
    if (id) {
      const product = await db
        .collection("products")
        .findOne({ _id: new ObjectId(id) });

      return new Response(JSON.stringify(product), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // 👉 All products
    const products = await db.collection("products").find({}).toArray();
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
