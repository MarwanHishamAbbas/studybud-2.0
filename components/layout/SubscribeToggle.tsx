"use client";

import { FC, startTransition } from "react";
import { Button } from "../ui/Button";
import { Room } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {
  SubscribeToRoomPayload,
  UnubscribeToRoomPayload,
} from "@/lib/validators/room";

import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface SubscribeToggleProps {
  isSubscribed: boolean;
  room: Room | null;
}

const SubscribeToggle: FC<SubscribeToggleProps> = ({ isSubscribed, room }) => {
  const router = useRouter();
  const { mutate: subscribe, isLoading: subscribing } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToRoomPayload = {
        roomId: room?.id as string,
      };
      const { data } = await axios.post("/api/room/subscribe", payload);
      return data as string;
    },
    onError: (error) => {
      return toast({
        title: "There was a problem.",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      startTransition(() => {
        // Refresh the current route and fetch new data from the server without
        // losing client-side browser or React state.
        router.refresh();
      });
      toast({
        title: "Subscribed!",
        description: `You are now subscribed to "${room?.name}"`,
      });
    },
  });
  const { mutate: unsubscribe, isLoading: unsubscribing } = useMutation({
    mutationFn: async () => {
      const payload: UnubscribeToRoomPayload = {
        roomId: room?.id as string,
        userId: room?.creatorId as string,
      };
      const { data } = await axios.post("/api/room/unsubscribe", payload);
      return data as string;
    },
    onError: (error) => {
      return toast({
        title: "There was a problem.",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      startTransition(() => {
        // Refresh the current route and fetch new data from the server without
        // losing client-side browser or React state.
        router.refresh();
      });
      toast({
        title: "Unsubscribed!",
        description: `You are now unsubscribed from "${room?.name}"`,
      });
    },
  });
  return isSubscribed ? (
    <Button onClick={() => unsubscribe()} isLoading={unsubscribing}>
      Leave Room
    </Button>
  ) : (
    <Button isLoading={subscribing} onClick={() => subscribe()}>
      Subscribe
    </Button>
  );
};

export default SubscribeToggle;
