import { FC } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Room } from "@prisma/client";
import { clerkClient } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { db } from "@/lib/db";
import { Users } from "lucide-react";
import Link from "next/link";
import { formatTimeToNow } from "@/lib/utils";
import { Badge } from "../ui/Badge";

interface RoomCardProps {
  room: Room | null;
}

const RoomCard: FC<RoomCardProps> = async ({ room }) => {
  const author = await clerkClient.users.getUser(room?.creatorId as string);
  const subscribers = await db.room.findFirst({
    where: {
      id: room?.id,
    },
    select: {
      _count: { select: { subscribers: true } },
    },
  });

  return (
    <Link className="block" href={`/room/${room?.id}`}>
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
              <p className="text-primary">
                {author.emailAddresses[0].emailAddress}
              </p>
            </div>
            <p className="text-gray-500 text-sm hidden lg:block">
              {formatTimeToNow(new Date(room?.createdAt as Date))}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <CardTitle className="text-xl lg:text-2xl">{room?.name}</CardTitle>
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            <p className="text-sm text-gray-500">
              {subscribers?._count.subscribers} Joined
            </p>
          </div>
          <Badge>{room?.topic}</Badge>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default RoomCard;
