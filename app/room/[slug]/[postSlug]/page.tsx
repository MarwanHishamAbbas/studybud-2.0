import { FC, Suspense } from "react";
import { db } from "@/lib/db";
import { clerkClient, currentUser } from "@clerk/nextjs";
import { User } from "@prisma/client";
import RoomSubscribers from "@/components/room/RoomSubscribers";
import Loading from "@/components/shared/Loading";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";

import { formatTimeToNow } from "@/lib/utils";

import Link from "next/link";

import { MessageCircleIcon } from "lucide-react";
import EditorOutput from "@/components/ui/EditorOutput";
import PostHeader from "@/components/room/post/PostHeader";

interface pageProps {
  params: {
    postSlug: string;
  };
}

const page: FC<pageProps> = async ({ params }) => {
  const user: User | null = await currentUser();
  const { postSlug } = params;

  const subscribers = await db.subscription.findMany({
    where: {
      roomId: postSlug,
    },
    select: {
      userId: true,
    },
  });

  const post = await db.post.findFirst({
    where: { id: postSlug },
  });
  const author = await clerkClient.users.getUser(post?.authorId as string);

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
                <p className="text-gray-500 text-sm hidden lg:block">
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

            <CardFooter className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <MessageCircleIcon className="w-4 h-4 text-primary" />
                <p className="text-sm text-gray-500">10 Comments</p>
              </div>
            </CardFooter>
          </Card>
        </Suspense>
      </main>
    </div>
  );
};

export default page;
