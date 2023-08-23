import z from "zod";

export const RoomValidator = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be longer than 3 characters" })
    .max(128, { message: "Title must be at least 128 character" }),
  topic: z.string(),
});

export type RoomCreationRequest = z.infer<typeof RoomValidator>;

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
