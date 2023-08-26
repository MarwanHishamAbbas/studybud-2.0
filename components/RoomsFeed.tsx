import { db } from "@/lib/db";
import { FC } from "react";

import RoomCard from "./shared/RoomCard";
import { AlertCircle } from "lucide-react";

interface RoomsFeedProps {
  topic?: string;
  search?: string;
}

const RoomsFeed = async ({ topic, search }: RoomsFeedProps) => {
  const rooms = await db.room.findMany({
    where: {
      topic: topic,
      name: { contains: search, mode: "insensitive" },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (rooms.length === 0) {
    return (
      <div className="text-center space-y-2 text-gray-500">
        <AlertCircle className="w-20 h-20 mx-auto" />
        <h1 className="text-3xl ">No Rooms Found</h1>
      </div>
    );
  }

  return (
    <main className="space-y-7">
      {rooms.map((room, idx) => (
        <RoomCard room={room} key={idx} />
      ))}
    </main>
  );
};

export default RoomsFeed;
