import { z } from "zod";

const productValidationSchema = z.object({
  image: z.string().min(1, "Image is required"),
  name: z.string().min(5, "Name is too short"),
  priceCents: z.coerce
    .number({
      invalid_type_error: "Please input numbers",
    })
    .min(1, "Price is required"),

  keywords: z.preprocess(
    (value) =>
      typeof value === "string"
        ? value.split(",").map((keyword) => keyword.trim())
        : value,
    z.array(z.string().min(3, "Keyword is too short"))
  ),
});

export default productValidationSchema;
