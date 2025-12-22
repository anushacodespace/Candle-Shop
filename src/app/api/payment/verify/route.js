import crypto from "crypto";

export async function POST(req) {
  const body = await req.json();

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = body;

  const secret = process.env.RAZORPAY_SECRET;

  const generatedSignature = crypto
    .createHmac("sha256", secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  if (generatedSignature === razorpay_signature) {
    return Response.json(
      { success: true },
      { status: 200 }
    );
  } else {
    return Response.json(
      { success: false },
      { status: 400 }
    );
  }
}
