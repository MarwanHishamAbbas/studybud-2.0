import SignInButton from "@/components/shared/SignInButton";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { toast } from "@/hooks/use-toast";
import { RedirectToSignIn, SignIn } from "@clerk/nextjs";

export const useCustomToasts = () => {
  const loginToast = () => {
    toast({
      title: "Login required.",
      description: "You need to be logged in to do that.",
      variant: "destructive",
      duration: 10000,
      action: (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Sign in</Button>
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
      ),
    });
  };

  return { loginToast };
};
