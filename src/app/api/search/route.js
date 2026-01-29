// src/app/api/search/route.js
import connectDB from "../../../lib/mongodb";

export const dynamic = "force-dynamic";
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    if (!q) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { db } = await connectDB();

    // Case-insensitive search on product name
    const products = await db
      .collection("products")
      .find({
        name: { $regex: q, $options: "i" },
      })
      .limit(10) // suggestions limit
      .project({
        name: 1,
        price: 1,
        image: 1,
      })
      .toArray();

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[SEARCH API ERROR]", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
