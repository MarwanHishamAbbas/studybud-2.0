import { FC } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/Dialog";
import { Button } from "../ui/Button";
import { SignUp } from "@clerk/nextjs";

interface RegisterButtonProps {}

const RegisterButton: FC<RegisterButtonProps> = ({}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Register</Button>
      </DialogTrigger>
      <DialogContent>
        <SignUp
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

export default RegisterButton;
