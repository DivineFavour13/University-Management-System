import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { Webhook } from "svix";
import { db } from "@/lib/db";
import { clerkClient } from "@clerk/nextjs/server";

type ClerkWebhookEvent = {
  type: string;
  data: {
    id: string;
    email_addresses: { email_address: string; id: string }[];
    first_name: string | null;
    last_name: string | null;
    image_url: string | null;
    public_metadata: { role?: string };
  };
};

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    return NextResponse.json({ error: "No webhook secret" }, { status: 500 });
  }

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return NextResponse.json({ error: "Missing svix headers" }, { status: 400 });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: ClerkWebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as ClerkWebhookEvent;
  } catch {
    return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
  }

  const { type, data } = evt;

  if (type === "user.created") {
    const email = data.email_addresses[0]?.email_address ?? "";
    const firstName = data.first_name ?? "";
    const lastName = data.last_name ?? "";

    // Create user in DB
    const user = await db.user.create({
      data: {
        clerkId: data.id,
        email,
        firstName,
        lastName,
        avatar: data.image_url ?? undefined,
        role: "STUDENT", // default role — Admin changes this via dashboard
      },
    });

    // Generate student profile by default
    const studentCount = await db.studentProfile.count();
    const studentId = `STU-${new Date().getFullYear()}-${String(studentCount + 1).padStart(4, "0")}`;

    await db.studentProfile.create({
      data: {
        userId: user.id,
        studentId,
        status: "PROVISIONAL",
      },
    });

    // Set default role in Clerk publicMetadata
    const client = await clerkClient();
    await client.users.updateUserMetadata(data.id, {
      publicMetadata: { role: "STUDENT" },
    });
  }

  if (type === "user.updated") {
    await db.user.updateMany({
      where: { clerkId: data.id },
      data: {
        email: data.email_addresses[0]?.email_address ?? undefined,
        firstName: data.first_name ?? undefined,
        lastName: data.last_name ?? undefined,
        avatar: data.image_url ?? undefined,
      },
    });
  }

  if (type === "user.deleted") {
    await db.user.deleteMany({ where: { clerkId: data.id } });
  }

  return NextResponse.json({ received: true });
}
