import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutInputs } from "../components/checkout/checkoutInputs";
import { onSubmit } from "../components/checkout/onSubmit";
import checkoutFormValidation from "../validations/checkoutFormValidation";

const Checkout = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(checkoutFormValidation) });

  return (
    <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0 my-0 mx-auto">
      <h2 className="text-2xl font-bold text-gray-800">Complete your order</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8">
        <div>
          <h3 className="text-sm lg:text-base text-gray-800 mb-4">
            Personal Details
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {checkoutInputs.map((input, index) => {
              return (
                <div key={index}>
                  <input
                    {...register(input.id)}
                    type={input.type}
                    placeholder={input.placeholder}
                    className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600"
                  />
                  {input.displayErrorMessage(errors)}
                </div>
              );
            })}

            <div>
              <input
                {...register("date")}
                type="text"
                className="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md"
                disabled
                defaultValue={new Date().toLocaleDateString()}
              />
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex gap-4 max-md:flex-col mt-8">
            <button
              type="button"
              className="rounded-md px-4 py-2.5 w-full text-sm tracking-wide bg-transparent hover:bg-gray-100 border border-gray-300 text-gray-800 max-md:order-1"
            >
              Cancel
            </button>
            <button
              className="rounded-md px-4 py-2.5 w-full text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Complete Purchase"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
