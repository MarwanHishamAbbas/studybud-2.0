import { FC } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Post } from "@prisma/client";
import { clerkClient } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";

import { formatTimeToNow } from "@/lib/utils";
import PostContent from "./PostContent";
import Link from "next/link";

import { MessageCircleIcon } from "lucide-react";
import { db } from "@/lib/db";

interface PostCardProps {
  post: Post | null;
}

const PostCard: FC<PostCardProps> = async ({ post }) => {
  const author = await clerkClient.users.getUser(post?.authorId as string);
  const commentsCount = await db.comment.findMany({
    where: {
      postId: post?.id,
    },
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src={author.imageUrl}
                alt={author.emailAddresses[0].emailAddress}
                className="object-cover"
              />
              <AvatarFallback>
                {author.firstName?.charAt(0)}
                {author.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1>
                {author.firstName} {author.lastName}
              </h1>
              <p className="text-primary text-sm">
                {author.emailAddresses[0].emailAddress}
              </p>
            </div>
          </div>
          <p className="text-gray-500 text-sm">
            {formatTimeToNow(new Date(post?.createdAt as Date))}
          </p>
        </div>
      </CardHeader>
      <Link href={`/room/${post?.roomId}/${post?.id}`} className="block">
        <CardContent className="space-y-5">
          <CardTitle className="text-xl lg:text-2xl">{post?.title}</CardTitle>
          <PostContent content={post?.content} />
        </CardContent>
      </Link>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <MessageCircleIcon className="w-4 h-4 text-primary" />
          <p className="text-sm text-gray-500">
            {commentsCount.length} Comments
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
