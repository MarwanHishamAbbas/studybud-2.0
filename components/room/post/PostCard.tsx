import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Post } from "@prisma/client";
import { clerkClient } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";

import { formatTimeToNow } from "@/lib/utils";
import PostContent from "./PostContent";
import Link from "next/link";

interface PostCardProps {
  post: Post | null;
}

const PostCard: FC<PostCardProps> = async ({ post }) => {
  const author = await clerkClient.users.getUser(post?.authorId as string);

  return (
    <Link href={`/room/${post?.roomId}/${post?.id}`} className="block">
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
            <p className="text-gray-500 text-sm hidden lg:block">
              {formatTimeToNow(new Date(post?.createdAt as Date))}
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-5">
          <CardTitle className="text-xl lg:text-2xl">{post?.title}</CardTitle>
          <PostContent content={post?.content} />
        </CardContent>
      </Card>
    </Link>
  );
};

export default PostCard;
