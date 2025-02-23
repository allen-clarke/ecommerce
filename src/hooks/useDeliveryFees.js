import { useEffect, useState } from "react";

const useDeliveryFees = (actualPurchase) => {
  const [deliveryFees, setDeliveryFees] = useState(0);

  useEffect(() => {
    if (actualPurchase === 0) setDeliveryFees(Number(0).toFixed(2));
    else if (actualPurchase > 150) setDeliveryFees("Free");
    else setDeliveryFees(Number(3).toFixed(2));
  }, [actualPurchase]);

  return { deliveryFees };
};

export default useDeliveryFees;
