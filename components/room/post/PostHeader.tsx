"use client";

import { FC } from "react";
import RoomOptions from "@/components/room/RoomOptions";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Post, User } from "@prisma/client";
import { useRouter } from "next/navigation";
import PostOptions from "./PostOptions";

interface PostHeaderProps {
  post: Post | null;
  user: User | null;
}

const PostHeader: FC<PostHeaderProps> = ({ post, user }) => {
  const router = useRouter();
  const postCreator = post?.authorId === user?.id;

  return (
    <header>
      <div className="py-3 pr-4 bg-secondary rounded-lg flex items-center justify-between ">
        <Button
          onClick={() => router.back()}
          variant="secondary"
          className="group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-all" />
          <p>Go Back</p>
        </Button>

        {postCreator && <PostOptions postId={post?.id as string} />}
      </div>
    </header>
  );
};

export default PostHeader;
