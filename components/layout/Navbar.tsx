import Image from "next/image";
import { FC } from "react";

import Link from "next/link";
import AuthButton from "../shared/AuthButton";
import { Input } from "../ui/Input";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import UserButton from "../shared/UserButton";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = async ({}) => {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <header className="py-6 bg-secondary">
      <nav className="max-w-7xl px-2 lg:px-2 mx-auto flex items-center justify-between h-full">
        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/logo.svg"
            alt="StudyBud's logo"
            width={45}
            height={45}
            quality={100}
          />
          <h1 className="text-xl lg:text-2xl font-semibold hidden sm:block">
            StudyBud
          </h1>
        </Link>
        <Input
          className="w-1/3 hidden lg:flex"
          type="search"
          placeholder="Search..."
        />
        {user ? <UserButton user={user} /> : <AuthButton />}
      </nav>
    </header>
  );
};

export default Navbar;
