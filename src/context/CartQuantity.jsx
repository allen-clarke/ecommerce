import { createContext, useState } from "react";

export const CartQuantity = createContext();

const ContextProvider = ({ children }) => {
  const [cartQuantity, setCartQuantity] = useState(0);

  return (
    <CartQuantity.Provider value={{ cartQuantity, setCartQuantity }}>
      {children}
    </CartQuantity.Provider>
  );
};

export default ContextProvider;
