import Image from "next/image";
import { FC } from "react";
import { currentUser, UserButton } from "@clerk/nextjs";
import type { User } from "@clerk/nextjs/api";
import Link from "next/link";
import AuthButton from "../shared/AuthButton";

import SearchInput from "./SearchInput";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = async ({}) => {
  const user: User | null = await currentUser();
  return (
    <header className="py-6 bg-secondary backdrop-blur-sm">
      <nav className="max-w-7xl px-2 lg:px-2 mx-auto flex items-center justify-between h-full">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/logo.svg"
            alt="StudyBud's logo"
            width={45}
            height={45}
            quality={100}
          />
          <h1 className="text-xl lg:text-2xl font-bold hidden sm:block">
            StudyBud 2.0
          </h1>
        </Link>
        <SearchInput />
        {user ? (
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-11 h-11",
              },
            }}
          />
        ) : (
          <AuthButton />
        )}
      </nav>
    </header>
  );
};

export default Navbar;
