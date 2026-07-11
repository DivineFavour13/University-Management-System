import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/db";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
});

export async function POST(req: Request) {
  const body = await req.text();
  const headerPayload = await headers();
  const signature = headerPayload.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No stripe signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Handle checkout session completed (most reliable event)
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const studentProfileId = session.metadata?.studentProfileId;

    if (!studentProfileId) {
      return NextResponse.json({ error: "Missing studentProfileId" }, { status: 400 });
    }

    // Update all pending payments for this student to COMPLETED
    await db.payment.updateMany({
      where: {
        studentId: studentProfileId,
        status: "PENDING",
      },
      data: { status: "COMPLETED" },
    });

    // Flip student status: PROVISIONAL → ACTIVE
    await db.studentProfile.update({
      where: { id: studentProfileId },
      data: { status: "ACTIVE" },
    });

    // Log audit
    const student = await db.studentProfile.findUnique({
      where: { id: studentProfileId },
    });

    if (student) {
      await db.auditLog.create({
        data: {
          userId: student.userId,
          action: "PAYMENT_COMPLETED",
          entity: "StudentProfile",
          entityId: studentProfileId,
          newValue: { status: "ACTIVE", sessionId: session.id },
        },
      });
    }
  }

  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    await db.payment.updateMany({
      where: { stripePaymentIntentId: paymentIntent.id },
      data: { status: "FAILED" },
    });
  }

  return NextResponse.json({ received: true });
}
