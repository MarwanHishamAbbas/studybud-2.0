import { db } from "@/lib/db";
import { PostValidator } from "@/lib/validators/post";
import { currentUser } from "@clerk/nextjs";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, roomId } = PostValidator.parse(body);
    const user = await currentUser();
    const postExists = await db.post.findFirst({
      where: {
        title,
      },
    });
    if (postExists) {
      return new Response("Post Already Exists", { status: 409 });
    }
    const createdPost = await db.post.create({
      data: {
        title,
        authorId: user?.id as string,
        content,
        roomId,
      },
    });
    revalidatePath(`/room/${roomId}`);
    return new Response(createdPost.id);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 });
    }
    return new Response(
      "Could not create a post at this time. Please try later",
      { status: 500 }
    );
  }
}
