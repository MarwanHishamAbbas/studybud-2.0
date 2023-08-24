import z from "zod";

export const RoomValidator = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be longer than 3 characters" })
    .max(128, { message: "Title must be at least 128 character" }),
  topic: z.string(),
});

export const RoomSubscriptionValidator = z.object({
  roomId: z.string(),
});
export const RoomUnsubscriptionValidator = z.object({
  roomId: z.string(),
  userId: z.string(),
});

export type RoomValidatorPayload = z.infer<typeof RoomValidator>;
export type SubscribeToRoomPayload = z.infer<typeof RoomSubscriptionValidator>;
export type UnubscribeToRoomPayload = z.infer<
  typeof RoomUnsubscriptionValidator
>;

export const topicList = [
  "Python",
  "Django",
  "JavaScript",
  "ReactJS",
  "NextJS",
  "Angular",
  "VueJS",
  "Svelte",
  "Design",
];
