"use client";
import { FC } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { PostRequestPayload } from "@/lib/validators/post";

interface PostOptionsProps {
  postId: string;
}

const PostOptions: FC<PostOptionsProps> = ({ postId }) => {
  const router = useRouter();
  const { mutate: deletePost, isLoading: deleting } = useMutation({
    mutationFn: async () => {
      const payload: PostRequestPayload = {
        postId,
      };
      const { data } = await axios.post("/api/room/post/delete", payload);
      return data as string;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 500) {
          return toast({
            title: "Internal Server Error.",
            description:
              "Could not delete a post at this time. Please try later",
            variant: "destructive",
          });
        }
      }
    },
    onSuccess: (data) => {
      router.push(`/room/${data}`);
      return toast({
        title: "Post was successfully deleted",
        description: "Create another one and start networking",
      });
    },
  });
  return (
    <Button onClick={() => deletePost()} variant="ghost" asChild>
      {deleting ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Trash2 className="w-5 h-5" />
      )}
    </Button>
  );
};

export default PostOptions;
