import { db } from "@/lib/db";
import { FC } from "react";

import RoomCard from "./shared/RoomCard";

interface RoomsFeedProps {}

const RoomsFeed: FC<RoomsFeedProps> = async ({}) => {
  const rooms = await db.room.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <main className="space-y-7">
      {rooms.map((room, idx) => (
        <RoomCard room={room} key={idx} />
      ))}
    </main>
  );
};

export default RoomsFeed;
