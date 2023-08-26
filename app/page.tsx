import RoomsFeed from "@/components/RoomsFeed";
import HomeHeader from "@/components/layout/HomeHeader";
import { db } from "@/lib/db";
import { Suspense } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import Loading from "@/components/shared/Loading";
import { clerkClient } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";

interface HomeProps {
  searchParams: {
    topic?: string;
    search?: string;
  };
}

export default async function HomePage({ searchParams }: HomeProps) {
  const topUsers = await clerkClient.users.getUserList();
  const roomsCount = await db.room.findMany({
    where: {
      topic: searchParams?.topic,
      name: {
        contains: searchParams?.search,
        mode: "insensitive",
      },
    },
  });

  return (
    <main className="lg:grid grid-cols-3 gap-10">
      <div className=" col-span-2 space-y-12">
        <HomeHeader roomsCount={roomsCount.length} />

        <RoomsFeed topic={searchParams.topic} search={searchParams.search} />
      </div>

      <Card className="basis-1/4 h-fit sticky top-5 hidden lg:block">
        <CardHeader className="border-b mb-5 py-5">
          <h1 className="text-xl font-semibold">Top Users</h1>
        </CardHeader>
        <CardContent className="flex flex-col items-start gap-5 ">
          {topUsers.reverse().map((user) => (
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage
                  src={user.imageUrl}
                  alt={user.emailAddresses[0].emailAddress}
                  className="object-cover"
                />
                <AvatarFallback>
                  {user.firstName?.charAt(0)}
                  {user.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <h1 className="flex flex-col">
                {user.firstName} {user.lastName}{" "}
              </h1>
            </div>
          ))}
        </CardContent>
      </Card>
    </main>
  );
}
