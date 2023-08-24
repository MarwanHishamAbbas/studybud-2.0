import { db } from "@/lib/db";
import { RoomSubscriptionValidator } from "@/lib/validators/room";
import { currentUser } from "@clerk/nextjs";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { roomId } = RoomSubscriptionValidator.parse(body);
    const user = await currentUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    await db.subscription.create({
      data: {
        roomId,
        userId: user.id,
      },
    });

    return new Response(roomId);
  } catch (error) {
    error;
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      "Could not subscribe to room at this time. Please try later",
      { status: 500 }
    );
  }
}
