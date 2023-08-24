import { db } from "@/lib/db";
import { RoomSubscriptionValidator } from "@/lib/validators/room";
import { revalidatePath } from "next/cache";

import { NextRequest } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { roomId } = RoomSubscriptionValidator.parse(body);

    const deletedRoom = await db.room.delete({
      where: {
        id: roomId,
      },
    });
    revalidatePath("/");

    return new Response(deletedRoom.name);
  } catch (error) {
    error;
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      "Could not delete to room at this time. Please try later",
      { status: 500 }
    );
  }
}
