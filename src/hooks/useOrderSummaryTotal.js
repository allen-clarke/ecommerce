import { useEffect, useState } from "react";

const useOrderSummaryTotal = (actualPurchase) => {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (actualPurchase === 0) setTotal(`$${Number(0).toFixed(2)}`);
    else if (actualPurchase > 150) setTotal(actualPurchase.toFixed(2));
    else setTotal((actualPurchase + Number(3)).toFixed(2));
  }, [actualPurchase]);

  return { total };
};

export default useOrderSummaryTotal;
