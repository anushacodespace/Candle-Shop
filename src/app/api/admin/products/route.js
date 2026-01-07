import connectDB from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

// GET all products
export async function GET() {
  try {
    const { db } = await connectDB();

    const products = await db
      .collection("products")
      .find({})
      .toArray();

    return Response.json(products);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

// CREATE product
export async function POST(req) {
  try {
    const body = await req.json();
    const { db } = await connectDB();

    if (Array.isArray(body)) {
      // Insert multiple
      const r = await db.collection("products").insertMany(body);
      return new Response(JSON.stringify({ inserted: r.insertedCount }), { status: 201 });
    }

    // Insert single
    const r = await db.collection("products").insertOne(body);
    return new Response(JSON.stringify({ insertedId: r.insertedId }), { status: 201 });

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}


// UPDATE product
export async function PUT(req) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;

    const { db } = await connectDB();

    await db.collection("products").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );

    return Response.json({ success: true });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}
