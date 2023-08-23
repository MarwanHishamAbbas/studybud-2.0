import { FC } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/Dialog";
import { Button } from "../ui/Button";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { RoomCreationRequest } from "@/lib/validators/room";
import { toast } from "@/hooks/use-toast";
import { useCustomToasts } from "@/hooks/use-custom-toast";
import { Input } from "@/components/ui/Input";

interface CreateRoomProps {}

const CreateRoom: FC<CreateRoomProps> = ({}) => {
  const router = useRouter();
  const [input, setInput] = useState<string>("");
  const { loginToast } = useCustomToasts();
  const { mutate: createRoom, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: RoomCreationRequest = {
        title: input,
      };
      const { data } = await axios.post("/api/room/create", payload);
      return data as string;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return loginToast();
        }
      }
    },
    onSuccess: (data) => {
      setInput("");
      //   router.push(`/rooms/${data}`);

      return toast({
        title: `"${data}" room was created successfully`,
        description: "Start creating posts now",
      });
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Room</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <h4 className="text-3xl text-center mb-4 font-semibold">
            Create Room
          </h4>
        </DialogHeader>
        <Input
          value={input}
          placeholder="Room Name..."
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          className="w-fit mx-auto"
          isLoading={isLoading}
          disabled={input.length === 0}
          onClick={() => createRoom()}
        >
          Create Room
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoom;
