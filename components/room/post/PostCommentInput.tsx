"use client";

import { Button } from "@/components/ui/Button";
import { CardFooter } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { FC, startTransition, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { CommentCreationRequest } from "@/lib/validators/comment";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface PostCommentProps {
  postId: string;
}

const PostComment: FC<PostCommentProps> = ({ postId }) => {
  const [comment, setComment] = useState<string>("");
  const router = useRouter();
  const { mutate: commentPost, isLoading: commenting } = useMutation({
    mutationFn: async () => {
      const payload: CommentCreationRequest = {
        postId,
        text: comment,
      };
      const { data } = await axios.post("/api/room/post/comment", payload);
      return data;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 500) {
          return toast({
            title: "Internal Server Error.",
            description:
              "Could not create a comment at this time. Please try later",
            variant: "destructive",
          });
        }
      }
    },
    onSuccess: () => {
      setComment("");
      startTransition(() => {
        router.refresh();
      });
      return toast({
        title: "Comment Created Successfully",
        description: "Your comment has been published.",
      });
    },
  });
  return (
    <CardFooter className="flex flex-col lg:flex-row justify-between gap-2">
      <Input
        onChange={(event) => setComment(event.target.value)}
        placeholder="Leave a comment..."
        className="bg-white"
        value={comment}
      />
      <Button
        onClick={() => commentPost()}
        disabled={comment.length === 0 || commenting}
        isLoading={commenting}
      >
        Comment
      </Button>
    </CardFooter>
  );
};

export default PostComment;
