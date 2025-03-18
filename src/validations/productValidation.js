import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/webp",
];

const productValidationSchema = z.object({
  image: z
    .custom((file) => file instanceof File, "File is required")
    .refine(
      (file) => file.size < 5 * 1024 * 1024,
      "File must be smaller than 5MB"
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "File type is not allowed"
    ),

  name: z.string().min(5, "Name is too short"),

  price: z.coerce
    .number({ invalid_type_error: "Please input numbers" })
    .min(1, "Price is required"),

  category: z.string().min(5, "Select Category"),

  keywords: z.preprocess(
    (value) =>
      typeof value === "string" && value.trim() !== ""
        ? value.split(",").map((keyword) => keyword.trim())
        : [],
    z.array(z.string().min(3, "Keyword is too short"))
  ),
});

export default productValidationSchema;
