import Razorpay from "razorpay";

export async function POST(req) {
  try {
    const body = await req.json();
    const amount = Number(body.amount);

    console.log("🟢 Amount received:", amount);

    if (!amount || amount <= 0) {
      return Response.json(
        { error: "Invalid amount", received: body.amount },
        { status: 400 }
      );
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });

    const order = await razorpay.orders.create({
      amount: amount * 100, // paise
      currency: "INR",
    });

    return Response.json(order, { status: 200 });

  } catch (error) {
    console.error("🔥 Razorpay create order FAILED");
    console.error(error);

    return Response.json(
      {
        error: "Order creation failed",
        details: error?.error || error?.message || error,
      },
      { status: 500 }
    );
  }
}
