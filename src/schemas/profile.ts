import { z } from "zod";

export const ProfileFormSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  position: z.string().optional(),
});

export type ProfileFormValues = z.infer<typeof ProfileFormSchema>;
