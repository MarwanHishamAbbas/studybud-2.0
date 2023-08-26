import { FC, Suspense } from "react";
import { db } from "@/lib/db";
import { clerkClient, currentUser } from "@clerk/nextjs";
import { User } from "@prisma/client";
import Loading from "@/components/shared/Loading";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";

import { formatTimeToNow } from "@/lib/utils";

import EditorOutput from "@/components/ui/EditorOutput";
import PostHeader from "@/components/room/post/PostHeader";
import PostCommentInput from "@/components/room/post/PostCommentInput";
import PostComments from "@/components/room/post/PostComments";
import { MessageCircle } from "lucide-react";

interface PostPageProps {
  params: {
    postSlug: string;
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const user: User | null = await currentUser();
  const { postSlug } = params;

  const post = await db.post.findFirst({
    where: { id: postSlug },
  });
  const author = await clerkClient.users.getUser(post?.authorId as string);

  const subscriptionState = await db.subscription.findFirst({
    where: {
      roomId: post?.roomId,
      userId: user?.id,
    },
  });

  const isSubscribed = !!subscriptionState;

  const comments = await db.comment.findMany({
    where: {
      postId: post?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className=" gap-10 lg:grid grid-cols-3">
      <main className="col-span-2 space-y-5">
        <PostHeader user={user} post={post} />
        <Suspense fallback={<Loading />}>
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
                <p className="text-gray-500 text-sm  ">
                  {formatTimeToNow(new Date(post?.createdAt as Date))}
                </p>
              </div>
            </CardHeader>

            <CardContent className="space-y-5">
              <CardTitle className="text-xl lg:text-2xl">
                {post?.title}
              </CardTitle>
              <EditorOutput content={post?.content} />
            </CardContent>
            {isSubscribed ? (
              <PostCommentInput postId={post?.id as string} />
            ) : (
              <div className="text-center space-y-2 text-gray-500 py-10">
                <MessageCircle className="w-10 h-10 mx-auto" />
                <h1 className="text-3xl ">Subscribe to Comment</h1>
              </div>
            )}
          </Card>
        </Suspense>
        <PostComments comments={comments} />
      </main>
    </div>
  );
}
