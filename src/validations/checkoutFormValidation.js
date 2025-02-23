import { z } from "zod";

const checkoutFormValidation = z.object({
  firstname: z.string().min(1, "Required"),
  lastname: z.string().min(1, "Required"),
  email: z.string().email("Required"),
  phone: z
    .string()
    .min(10, "Must be atleast 10 characters")
    .max(13, "Must be less than 14 characters"),
  community: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  county: z.string().min(1, "Required"),
  date: z.string().optional(),
});

export default checkoutFormValidation;
