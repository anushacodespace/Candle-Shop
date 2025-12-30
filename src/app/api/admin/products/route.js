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

    body.createdAt = new Date();

    const result = await db.collection("products").insertOne(body);

    return Response.json({ success: true, id: result.insertedId });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
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
