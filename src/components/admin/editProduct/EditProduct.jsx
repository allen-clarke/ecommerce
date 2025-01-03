import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const EditProduct = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((resolve) => setProduct(resolve.data))
      .catch((error) => console.log(error));
  }, [id]);

  const productValidationSchema = z.object({
    image: z.string().min(1, "Image is required"),
    name: z.string().min(5, "Name is too short"),
    priceCents: z.coerce
      .number({
        invalid_type_error: "Please input numbers",
      })
      .min(1, "Price is required"),

    keywords: z.string().min(3, "Keyword is too short"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(productValidationSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col bg-stone-100 absolute top-20 left-56 right-4 min-h-screen py-4 rounded-lg">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col my-0 mx-auto"
      >
        <h1 className="text-black text-center md:text-left font-black anton-sc text-2xl my-4 ml-2">
          Edit Product
        </h1>
        <label className="text-black font-sans font-normal text-xl mb-4">
          Image
          <br />
          <input
            {...register("image")}
            type="text"
            id="product-image"
            className="border border-[rgb(29,35,42)] outline-gray-300 p-2 rounded-md font-sans font-normal text-xl md:w-96 w-80 mt-3.5"
          />
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </label>
        <label className="text-black font-sans font-normal text-xl mb-4">
          Name
          <br />
          <input
            {...register("name")}
            type="text"
            id="product-name"
            className="border border-[rgb(29,35,42)] outline-gray-300 p-2 rounded-md font-sans font-normal text-xl md:w-96 w-80 mt-3.5"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </label>
        <label className="text-black font-sans font-normal text-xl mb-4">
          Price
          <br />
          <input
            {...register("priceCents")}
            type="text"
            id="product-price"
            className="border border-[rgb(29,35,42)] outline-gray-300 p-2 rounded-md font-sans font-normal text-xl md:w-96 w-80 mt-3.5"
          />
          {errors.priceCents && (
            <p className="text-red-500">{errors.priceCents.message}</p>
          )}
        </label>

        <label className="text-black font-sans font-normal text-xl mb-4">
          Keywords
          <br />
          <input
            {...register("keywords")}
            type="text"
            id="keywords"
            className="border border-[rgb(29,35,42)] outline-gray-300 p-2 rounded-md font-sans font-normal text-xl md:w-96 w-80 mt-3.5"
          />
          {errors.keywords && (
            <p className="text-red-500">{errors.keywords.message}</p>
          )}
        </label>

        <div className="flex items-center">
          <button className="flex items-center h-10 px-2 text-[11px] font-sans font-bold border rounded-md text-white bg-blue-700 mr-3">
            Save Changes
          </button>
          <Link
            to="/admin"
            type="button"
            className="flex items-center h-10 px-2 text-[11px] font-sans font-bold border rounded-md text-white bg-green-950"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};
export default EditProduct;
