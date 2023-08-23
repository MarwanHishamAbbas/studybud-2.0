"use client";

import { FC } from "react";
import { Input } from "../ui/Input";
import { useRouter } from "next/navigation";

interface SearchInputProps {}

const SearchInput: FC<SearchInputProps> = ({}) => {
  const router = useRouter();

  return (
    <Input
      className="w-1/3 hidden lg:flex"
      placeholder="Search..."
      onChange={(event) => {
        setTimeout(() => {
          router.replace(`/?search=${event.target.value}`);
        }, 500);
      }}
    />
  );
};

export default SearchInput;
