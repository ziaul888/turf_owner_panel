import { z } from "zod";

export const customerSchema = z.object({
  id: z.number(),
  customerId: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  joinDate: z.string(),
  totalBookings: z.number(),
  totalSpent: z.string(),
  status: z.string(),
  membershipType: z.string(),
});

export type Customer = z.infer<typeof customerSchema>;