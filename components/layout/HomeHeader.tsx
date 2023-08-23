"use client";
import { FC } from "react";
import CreateRoom from "../shared/CreateRoom";

interface HomeHeaderProps {
  roomsCount: number;
}

const HomeHeader: FC<HomeHeaderProps> = ({ roomsCount }) => {
  return (
    <header className="flex items-center justify-between">
      <div>
        <h1 className="">Rooms</h1>
        <span className="text-gray-400">{roomsCount}</span>
      </div>
      <CreateRoom />
    </header>
  );
};

export default HomeHeader;
