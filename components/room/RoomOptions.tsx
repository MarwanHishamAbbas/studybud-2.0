"use client";
import { FC } from "react";
import { Button } from "../ui/Button";
import { Loader2, Trash2 } from "lucide-react";

import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { SubscribeToRoomPayload } from "@/lib/validators/room";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface RoomOptionsProps {
  roomId: string;
}

const RoomOptions: FC<RoomOptionsProps> = ({ roomId }) => {
  const router = useRouter();
  const { mutate: deleteRoom, isLoading: deleting } = useMutation({
    mutationFn: async () => {
      const payload: SubscribeToRoomPayload = {
        roomId,
      };
      const { data } = await axios.post("/api/room/delete", payload);
      return data as string;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 500) {
          return toast({
            title: "Internal Server Error.",
            description:
              "Could not delete a room at this time. Please try later",
            variant: "destructive",
          });
        }
      }
    },
    onSuccess: (data) => {
      router.push("/");
      return toast({
        title: `"${data}" room is successfully deleted`,
        description: "Create another one and start networking",
      });
    },
  });
  return (
    <Button onClick={() => deleteRoom()} variant="ghost" asChild>
      {deleting ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <Trash2 className="w-5 h-5" />
      )}
    </Button>
  );
};

export default RoomOptions;
