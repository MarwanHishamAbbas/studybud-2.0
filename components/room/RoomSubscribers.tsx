import { FC } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import type { User } from "@clerk/nextjs/api";
import { clerkClient } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { Room } from "@prisma/client";

interface RoomSubscribersProps {
  room: Room | null;
  subscribers: {
    userId: string;
  }[];
}

const RoomSubscribers: FC<RoomSubscribersProps> = async ({
  subscribers,
  room,
}) => {
  const subscribedClerkUsers: User[] = [];
  for (let i = 0; i < subscribers.length; i++) {
    const clerkUser = await clerkClient.users.getUser(subscribers[i].userId);
    subscribedClerkUsers.push(clerkUser);
  }

  return (
    <Card className="basis-1/4 h-fit sticky top-5 hidden lg:block">
      <CardHeader>
        <h1 className="text-xl font-semibold">Subscribers</h1>
      </CardHeader>
      <CardContent className="flex flex-col items-start gap-5 ">
        {subscribedClerkUsers.reverse().map((subscriber) => (
          <div
            className={`flex items-center gap-4 ${
              room?.creatorId === subscriber.id ? "-order-1" : ""
            }`}
          >
            <Avatar>
              <AvatarImage
                src={subscriber.imageUrl}
                alt={subscriber.emailAddresses[0].emailAddress}
                className="object-cover"
              />
              <AvatarFallback>
                {subscriber.firstName?.charAt(0)}
                {subscriber.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <h1 className="flex flex-col">
              {subscriber.firstName} {subscriber.lastName}{" "}
              <p className="text-sm text-gray-500">
                {room?.creatorId === subscriber.id ? "Author" : ""}
              </p>
            </h1>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RoomSubscribers;
