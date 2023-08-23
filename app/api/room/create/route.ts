import { db } from "@/lib/db";
import { RoomValidator } from "@/lib/validators/room";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, topic } = RoomValidator.parse(body);
    console.log(title, topic);
    const user = await currentUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }
    const roomExists = await db.room.findFirst({
      where: {
        name: title,
      },
    });
    if (roomExists) {
      return new Response("Room already exists", { status: 409 });
    }
    const createdRoom = await db.room.create({
      data: {
        name: title,
        creatorId: user.id,
        topic: topic,
      },
    });
    await db.subscription.create({
      data: {
        userId: user.id,
        roomId: createdRoom.id,
      },
    });
    return new Response(createdRoom.id);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      "Could not create a room at this time. Please try later",
      { status: 500 }
    );
  }
}
