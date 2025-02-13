import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { locationDetails } from "./LocationDetails";
import { onSubmit } from "./OnSubmit";

const checkoutFormValidation = z.object({
  fullname: z.string().min(1, "Full name is required"),
  mobile: z
    .string()
    .min(10, "Must be atleast 10 characters")
    .max(13, "Must be less than 14 digits"),
  home: z
    .string()
    .min(10, "Must be atleast 10 characters")
    .max(13, "Must be less than 14 digits"),
  county: z.string().min(1, "Select your county"),
  city: z.string().min(1, "Input your city"),
  community: z.string().min(1, "Input your community"),
  date: z.string().min(1),
});
const Checkout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(checkoutFormValidation) });

  return (
    <div className="flex flex-col justify-center min-h-screen mt-16">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:w-9/12 my-0 mx-auto"
      >
        <h1 className="text-black text-center md:text-left font-black anton-sc text-2xl my-4 ml-2">
          Delivery Information
        </h1>
        <div className="flex justify-evenly flex-wrap items-center md:border rounded-lg md:py-10 md:px-3">
          {locationDetails.map((details, index) => {
            return (
              <label
                className="text-black font-sans font-normal text-xl mb-4"
                key={index}
              >
                {details.label} <br />
                <input
                  {...register(details.id)}
                  type={details.type}
                  id={details.id}
                  className="border outline-gray-300 p-2 rounded-md font-sans font-normal text-xl md:w-96 w-80 mt-3.5"
                />
                {details.displayErrorMessage(errors)}
              </label>
            );
          })}

          <input
            {...register("date")}
            type="text"
            id="date"
            className="border outline-gray-300 p-2 rounded-md font-sans font-normal text-xl md:w-96 w-80 mt-3.5 hidden"
            value={new Date().toLocaleDateString()}
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-orange-500 hover:bg-orange-600 disabled:cursor-not-allowed text-white text-center text-xl font-medium font-serif py-2.5 rounded-3xl mb-12 my-0 mx-auto w-11/12 md:w-full"
        >
          {isSubmitting ? (
            <i className="bx bx-loader-alt bx-spin text-[25px]"></i>
          ) : (
            "Confirm Order"
          )}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
