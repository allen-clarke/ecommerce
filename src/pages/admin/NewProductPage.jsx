import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import productValidationSchema from "../../validations/productValidation";

const NewProducts = () => {
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
    <div className="flex h-screen bg-gray-100">
      <div className="flex-1 flex flex-col justify-center md:ml-64">
        <div className="p-6 bg-white m-4 rounded-lg shadow-md mt-20 overflow-auto">
          <div className="overflow-x-auto">
            <h2 className="text-2xl font-bold text-gray-800">Create Product</h2>
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
                      type="file"
                      className="w-full text-gray-400 font-semibold text-sm bg-white border file:cursor-pointer cursor-pointer file:border-0 file:py-3 file:px-4 file:mr-4 file:bg-gray-100 file:hover:bg-gray-200 file:text-gray-500 rounded"
                    />
                    <p className="text-xs text-gray-400 mt-2">
                      PNG, JPG, SVG, WEBP, and GIF are Allowed.
                    </p>

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
                      placeholder="Name"
                      className="px-4 py-3 text-gray-800 w-full text-sm rounded-md focus:outline-blue-600 focus:bg-transparent border border-gray-300 bg-stone-50"
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
                      placeholder="Price"
                      className="px-4 py-3 text-gray-800 w-full text-sm rounded-md focus:outline-blue-600 focus:bg-transparent border border-gray-300 bg-stone-50"
                    />
                    {errors.priceCents && (
                      <p className="text-red-500">
                        {errors.priceCents.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="keywords"
                      className="text-sm lg:text-base text-gray-800"
                    >
                      Category
                    </label>
                    <br />
                    <select
                      className="select bg-stone-50 border border-gray-300 w-full max-w-xs focus:outline-blue-600 focus:bg-transparent"
                      defaultValue="Category"
                    >
                      <option disabled>Category</option>
                      <option>Necklace</option>
                      <option>Footwear</option>
                      <option>Shirts</option>
                      <option>Trousers</option>
                    </select>
                    {errors.keywords && (
                      <p className="text-red-500">{errors.keywords.message}</p>
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
                      placeholder="Keywords"
                      className="px-4 py-3 text-gray-800 w-full text-sm rounded-md focus:outline-blue-600 focus:bg-transparent border border-gray-300 bg-stone-50"
                    />
                    {errors.keywords && (
                      <p className="text-red-500">{errors.keywords.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <div className="flex gap-4 max-md:flex-col mt-8">
                  <Link
                    to="/admin"
                    className="rounded-md px-4 py-2.5 w-full text-sm tracking-wide bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-800 max-md:order-1 text-center"
                  >
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
        </div>
      </div>
    </div>
  );
};
export default NewProducts;
