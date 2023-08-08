"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Button } from "../ui/Button";

export default function LogoutButton() {
  const supabase = createClientComponentClient({});
  async function signOutHandler() {
    await supabase.auth.signOut();
  }

  return (
    <Button className="w-full" onClick={signOutHandler} variant="destructive">
      Sign out
    </Button>
  );
}
