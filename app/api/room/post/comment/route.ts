import { db } from "@/lib/db";
import { CommentValidator } from "@/lib/validators/comment";
import { currentUser } from "@clerk/nextjs";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { postId, text } = CommentValidator.parse(body);
    const user = await currentUser();

    const createdComment = await db.comment.create({
      data: {
        text,
        authorId: user?.id as string,
        postId,
      },
    });
    return new Response(createdComment.id);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }
    return new Response("Could not comment at this time. Please try later", {
      status: 500,
    });
  }
}
