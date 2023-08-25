"use client";
import { FC } from "react";
import CreateRoom from "../shared/CreateRoom";

interface HomeHeaderProps {
  roomsCount: number;
}

const HomeHeader: FC<HomeHeaderProps> = ({ roomsCount }) => {
  return (
    <header className="flex items-center justify-between border-b pb-4">
      <div>
        <h1 className="text-xl font-semibold">ROOMS</h1>
        <span className="text-gray-500">{roomsCount} rooms available</span>
      </div>
      <CreateRoom />
    </header>
  );
};

export default HomeHeader;
