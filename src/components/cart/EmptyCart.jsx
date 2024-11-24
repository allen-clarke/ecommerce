const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center mt-[47vh]">
      <h1 className="text-black text-3xl font-black font-serif">Empty Cart</h1>
      <i className="bx bx-cart-alt text-9xl"></i>
      <p className="text-black font-serif font-normal">Go and Purchase</p>
    </div>
  );
};

export default EmptyCart;
