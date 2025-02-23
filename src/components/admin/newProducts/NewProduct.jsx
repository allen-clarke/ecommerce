import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const NewProducts = () => {
  const productValidationSchema = z.object({
    image: z.string().min(1, "Image is required"),
    name: z.string().min(5, "Name is required"),
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

  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(productValidationSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="rounded-md px-4 py-8 bg-stone-100 min-h-screen absolute top-20 left-56 right-4">
      <h2 className="text-2xl font-bold text-gray-800">New Product</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 max-w-4xl my-0 mx-auto"
      >
        <div>
          <h3 className="text-sm lg:text-base text-gray-800 mb-4">
            Product Details
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="image"
                className="text-sm lg:text-base text-gray-800"
              >
                Image
              </label>
              <input
                {...register("image")}
                type="text"
                id="image"
                placeholder="Product Image"
                className="px-4 py-3 text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
              />
              {errors.image && (
                <p className="text-red-500">{errors.image.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="product-name"
                className="text-sm lg:text-base text-gray-800"
              >
                Product Name
              </label>
              <input
                {...register("name")}
                type="text"
                id="product-name"
                placeholder="Product Name"
                className="px-4 py-3 text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="price"
                className="text-sm lg:text-base text-gray-800"
              >
                Price
              </label>
              <input
                {...register("priceCents")}
                type="text"
                id="price"
                placeholder="Price (in cents)"
                className="px-4 py-3 text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
              />
              {errors.priceCents && (
                <p className="text-red-500">{errors.priceCents.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="keywords"
                className="text-sm lg:text-base text-gray-800"
              >
                Keywords
              </label>
              <input
                {...register("keywords")}
                type="text"
                id="keywords"
                placeholder="Keywords (comma-separated if more than one)"
                className="px-4 py-3 text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
              />
              {errors.keywords && (
                <p className="text-red-500">{errors.keywords.message}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex gap-4 max-md:flex-col mt-8">
            <Link className="rounded-md px-4 py-2.5 w-full text-sm tracking-wide bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-800 max-md:order-1 text-center">
              Cancel
            </Link>
            <button
              type="submit"
              className="rounded-md px-4 py-2.5 w-full text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Add Product"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default NewProducts;
