import { FC } from "react";
import { Button } from "../ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";

import { MenuIcon } from "lucide-react";
import SignInButton from "./SignInButton";
import RegisterButton from "./RegisterButton";

interface AuthButtonProps {}

const AuthButton: FC<AuthButtonProps> = ({}) => {
  return (
    <>
      <div className="gap-2 hidden lg:flex">
        <SignInButton />
        <RegisterButton />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="lg:hidden">
          <Button size="icon">
            <MenuIcon className="w-6 h-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem asChild>
            <SignInButton />
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <RegisterButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default AuthButton;
