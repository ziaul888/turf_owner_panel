import { z } from "zod";

export const sectionSchema = z.object({
  id: z.number(),
  bookingId: z.string(),
  customer: z.string(),
  sportType: z.string(),
  dateTime: z.string(),
  amount: z.string(),
  status: z.string(),
  payment: z.string(),
  action: z.string(),
});
