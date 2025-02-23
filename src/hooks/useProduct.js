import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const useProduct = () => {
  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((resolve) => setProduct(resolve.data))
      .catch((error) => console.log(error));
  }, [id]);

  return { product };
};

export default useProduct;
