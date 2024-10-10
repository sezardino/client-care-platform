import { z } from "zod";

export const FeedbackWidgetSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
  rating: z.number().min(1).max(5),
});

export type FeedbackWidgetValues = z.infer<typeof FeedbackWidgetSchema>;
