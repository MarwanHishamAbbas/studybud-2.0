import { Room, User } from "@prisma/client";
import { FC } from "react";
import SubscribeToggle from "@/components/layout/SubscribeToggle";
import RoomOptions from "@/components/room/RoomOptions";
import { Button } from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface RoomHeaderProps {
  room: Room | null;
  user: User | null;
  isSubscribed: boolean;
}

const RoomHeader: FC<RoomHeaderProps> = ({ room, user, isSubscribed }) => {
  const roomCreator = room?.creatorId === user?.id && isSubscribed;
  return (
    <header className="space-y-7">
      <div className="py-3 pr-4 bg-secondary rounded-lg flex items-center justify-between ">
        <Link href="/">
          <Button variant="secondary" className="group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-all" />
            <p>All Rooms</p>
          </Button>
        </Link>
        {roomCreator && <RoomOptions roomId={room?.id as string} />}
      </div>
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-10 justify-between lg:items-center">
        <h1 className="text-3xl font-semibold text-primary whitespace-nowrap">
          {room?.name}
        </h1>
        <SubscribeToggle isSubscribed={isSubscribed} room={room} />
      </div>
    </header>
  );
};

export default RoomHeader;
