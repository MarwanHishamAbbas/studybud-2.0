import { db } from "@/lib/db";
import { RoomUnsubscriptionValidator } from "@/lib/validators/room";
import { currentUser } from "@clerk/nextjs";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { roomId, userId } = RoomUnsubscriptionValidator.parse(body);
    const user = await currentUser();

    if (!user) {
      return new Response("Unauthorized", { status: 401 });
    }

    await db.subscription.delete({
      where: {
        userId_roomId: {
          roomId,
          userId: user.id,
        },
      },
    });
    const mostRecentSubscribers = await db.subscription.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 2,
    });

    if (user?.id === userId) {
      console.log("I'm no longer the author");
      await db.room.update({
        where: {
          id: roomId,
        },
        data: {
          creatorId: mostRecentSubscribers[0].userId,
        },
      });
    }

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
