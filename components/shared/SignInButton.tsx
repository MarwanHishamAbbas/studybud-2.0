"use client";

import { FC } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/Dialog";
import { Button } from "../ui/Button";

import { SignIn } from "@clerk/nextjs";

interface SignInButtonProps {}

const SignInButton: FC<SignInButtonProps> = ({}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Sign in</Button>
      </DialogTrigger>
      <DialogContent>
        <SignIn
          appearance={{
            elements: {
              card: "w-full ml-0 shadow-none",
              rootBox: "w-full",
              formButtonPrimary: "bg-primary hover:bg-primary/90",
              footerActionLink: "text-primary hover:text-primary",
            },
          }}
          afterSignInUrl="/"
        />
      </DialogContent>
    </Dialog>
  );
};

export default SignInButton;
