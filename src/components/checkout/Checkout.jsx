import { useState } from "react";
import { useForm } from "react-hook-form";
import { locationDetails } from "./LocationDetails";
import { onSubmit } from "./OnSubmit";
import { paymentMethods } from "./PaymentMethod";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const handlePaymentMethodChange = (e) => {
    setValue("payment", e.target.value);
    setPaymentMethod(e.target.value);
  };

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
                  {...register(details.nameAndId, details.hookForm)}
                  type={details.type}
                  name={details.nameAndId}
                  id={details.nameAndId}
                  className="border outline-gray-300 p-2 rounded-md font-sans font-normal text-xl md:w-96 w-80 mt-3.5"
                />
                {details.displayErrorMessage(errors)}
              </label>
            );
          })}
        </div>

        <h2 className="text-black text-center md:text-left font-extrabold anton-sc text-xl mt-6 mb-2 ml-2">
          Delivery Schedule
        </h2>
        <div className="flex justify-evenly md:justify-start flex-wrap items-center md:border rounded-lg md:py-10 md:px-3">
          <label className="text-black font-sans font-normal text-xl -mt-0.5">
            Date <br />
            <input
              {...register("delivery")}
              type="date"
              name="delivery"
              id="delivery"
              className="border p-2 rounded-md font-sans font-medium text-xl md:w-96 w-80 mt-3.5"
            />
          </label>
        </div>

        <h2 className="text-black text-center md:text-left font-extrabold anton-sc text-xl mt-6 mb-2 ml-2">
          Payment Method
        </h2>
        <div className="flex justify-around flex-wrap items-center md:border rounded-lg py-3 md:py-7 md:px-3 mb-10">
          {paymentMethods.map((method, index) => (
            <div className="flex items-center" key={index}>
              <input
                {...register("payment", { required: "Select payment method" })}
                onChange={(e) => handlePaymentMethodChange(e)}
                type="radio"
                name="payment-method"
                id={method.id}
                value={method.value}
                className="mr-2 appearance-none"
              />

              <label
                htmlFor={method.labelFor}
                className="flex items-center text-black font-sans font-bold cursor-pointer"
              >
                <i
                  className={
                    paymentMethod === method.value
                      ? "bx bxs-circle text-xl mr-2"
                      : "bx bx-circle text-xl mr-2"
                  }
                ></i>
                <span>{method.value}</span>
              </label>
            </div>
          ))}
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
