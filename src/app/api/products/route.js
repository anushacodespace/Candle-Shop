// src/app/api/products/route.js
import connectDB from "../../../lib/mongodb";

export async function GET() {
  try {
    console.log("[API] GET /api/products called");
    const { db } = await connectDB();
    console.log("[API] connected to DB");
    const products = await db.collection("products").find({}).toArray();
    console.log("[API] products count:", products.length);
    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("[API ERR]", err);
    return new Response(JSON.stringify({ error: String(err.message || err) }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}

// optional: allow POST to insert test product from browser/JS
export async function POST(req) {
  try {
    const body = await req.json();
    const { db } = await connectDB();
    const r = await db.collection("products").insertOne({ ...body, createdAt: new Date() });
    return new Response(JSON.stringify({ insertedId: r.insertedId }), { status: 201, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    console.error("[API POST ERR]", err);
    return new Response(JSON.stringify({ error: String(err.message || err) }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
