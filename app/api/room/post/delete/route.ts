import { db } from "@/lib/db";
import { PostValidatorPayload } from "@/lib/validators/post";
import { revalidatePath } from "next/cache";

import { NextRequest } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postId } = PostValidatorPayload.parse(body);

    const deletedPost = await db.post.delete({
      where: {
        id: postId,
      },
    });
    revalidatePath(`/room/${deletedPost.roomId}`);

    return new Response(deletedPost.roomId);
  } catch (error) {
    error;
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response(
      "Could not delete the post at this time. Please try later",
      { status: 500 }
    );
  }
}
