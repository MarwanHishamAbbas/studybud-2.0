"use client";

import { User } from "@supabase/supabase-js";
import { FC } from "react";
import LogoutButton from "./LogoutButton";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from "../ui/DropdownMenu";
import { Button } from "../ui/Button";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

interface UserButtonProps {
  user: User;
}

const UserButton: FC<UserButtonProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>Profile</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem asChild>
          <span className="text-secondary-foreground">Hey, {user.email}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogoutButton />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
