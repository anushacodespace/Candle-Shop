// src/app/api/products/related/route.js
import connectDB from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const excludeId = searchParams.get("exclude");

    console.log("[RELATED API]", { category, excludeId });

    if (!category) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { db } = await connectDB();

    const pipeline = [
      {
        $match: {
          category: { $regex: `^${category.trim()}$`, $options: "i" },
          ...(excludeId && ObjectId.isValid(excludeId)
            ? { _id: { $ne: new ObjectId(excludeId) } }
            : {}),
        },
      },
      { $sample: { size: 4 } }, // 🎲 random products
    ];

    const products = await db
      .collection("products")
      .aggregate(pipeline)
      .toArray();

    return new Response(JSON.stringify(products), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("[RELATED API ERROR]", err);
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
