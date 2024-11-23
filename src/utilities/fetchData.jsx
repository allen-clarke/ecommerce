import axios from "axios";
import { useEffect } from "react";

function FetchData(endpoint, setAction, deps) {
  return useEffect(() => {
    axios
      .get(endpoint)
      .then((resolve) => setAction(resolve.data))
      .catch((error) => console.error(error));
  }, [endpoint, setAction, deps]);
}
export default FetchData;
