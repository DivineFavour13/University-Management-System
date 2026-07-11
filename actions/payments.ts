"use server";

import { stripe } from "@/lib/stripe";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export async function createCheckoutSession() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  // Get user + student profile from DB
  const user = await db.user.findUnique({
    where: { clerkId: userId },
    include: { studentProfile: true },
  });

  if (!user || !user.studentProfile) {
    throw new Error("Student profile not found");
  }

  if (user.studentProfile.status === "ACTIVE") {
    throw new Error("Account is already active");
  }

  // Create Stripe Checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "payment",
    line_items: [
      {
        price: process.env.STRIPE_TUITION_PRICE_ID!,
        quantity: 1,
      },
    ],
    metadata: {
      studentProfileId: user.studentProfile.id,
      userId: user.id,
      clerkId: userId,
    },
    customer_email: user.email,
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/student/fees?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/student/fees?cancelled=true`,
  });

  // Create pending payment record in DB
  await db.payment.create({
    data: {
      studentId: user.studentProfile.id,
      amount: 500000,
      currency: "NGN",
      stripePaymentIntentId: session.payment_intent as string,
      type: "TUITION",
      status: "PENDING",
      semester: "FALL",
      academicYear: "2025/2026",
      description: "Tuition fee - Fall 2025/2026",
    },
  });

  redirect(session.url!);
}

export async function getPaymentHistory() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkId: userId },
    include: {
      studentProfile: {
        include: {
          payments: {
            orderBy: { createdAt: "desc" },
          },
        },
      },
    },
  });

  return user?.studentProfile?.payments ?? [];
}
