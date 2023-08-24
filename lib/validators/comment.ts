import z from "zod";

export const CommentValidator = z.object({
  text: z
    .string()
    .min(3, { message: "Title must be longer than 3 characters" })
    .max(128, { message: "Title must be at least 128 character" }),
  postId: z.string(),
});

export type CommentCreationRequest = z.infer<typeof CommentValidator>;
