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
import { RoomValidatorPayload, topicList } from "@/lib/validators/room";
import { toast } from "@/hooks/use-toast";
import { useCustomToasts } from "@/hooks/use-custom-toast";
import { Input } from "@/components/ui/Input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";

interface CreateRoomProps {}

const CreateRoom: FC<CreateRoomProps> = ({}) => {
  const router = useRouter();
  const [input, setInput] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const { loginToast } = useCustomToasts();
  const { mutate: createRoom, isLoading } = useMutation({
    mutationFn: async () => {
      const payload: RoomValidatorPayload = {
        title: input,
        topic: topic,
      };
      const { data } = await axios.post("/api/room/create", payload);

      return data as string;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return loginToast();
        }
        if (error.response?.status === 409) {
          return toast({
            title: "Room already exists.",
            description: "Please choose a different name.",
            variant: "destructive",
          });
        }
        if (error.response?.status === 500) {
          return toast({
            title: "Internal Server Error.",
            description:
              "Could not create a room at this time. Please try later",
            variant: "destructive",
          });
        }
      }
    },

    onSuccess: (data) => {
      router.push(`/room/${data}`);

      return toast({
        title: `Room was created successfully`,
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
        <Select required onValueChange={(e) => setTopic(e)}>
          <SelectTrigger className="w-[180px] mx-auto">
            <SelectValue placeholder="Select a topic" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {topicList.map((topic) => (
                <SelectItem value={topic}>{topic}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button
          className="w-fit mx-auto"
          isLoading={isLoading}
          disabled={input.length === 0 || topic.length === 0}
          onClick={() => createRoom()}
        >
          Create Room
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoom;
