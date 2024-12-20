export const onSubmit = async (data) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 4000);
  });
  // axios.post("http://localhost:3000/deliveryInformations", data);
  console.log(data);

  // reset();
};
