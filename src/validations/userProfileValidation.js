import { z } from "zod";

const ACCEPTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/gif",
  "image/webp",
];
const userPhotoValidation = z.object({
  photo: z
    .custom((file) => file instanceof File, "Image is required")
    .refine(
      (file) => file.size < 5 * 1024 * 1024,
      "Image must be smaller than 5MB"
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "File type is not allowed"
    ),
});
export default userPhotoValidation;
