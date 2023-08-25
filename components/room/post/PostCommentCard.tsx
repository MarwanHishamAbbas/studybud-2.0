import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { clerkClient } from "@clerk/nextjs";
import { Comment } from "@prisma/client";
import { formatTimeToNow } from "@/lib/utils";

interface PostCommentCardProps {
  comment: Comment | null;
}

const PostCommentCard: FC<PostCommentCardProps> = async ({ comment }) => {
  const author = await clerkClient.users.getUser(comment?.authorId as string);
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
            {formatTimeToNow(new Date(comment?.createdAt as Date))}
          </p>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm lg:text-base">{comment?.text}</p>
      </CardContent>
    </Card>
  );
};

export default PostCommentCard;
