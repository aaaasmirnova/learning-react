import axios from "axios";
import { useEffect, useState } from "react";

export const useAxios = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url);

      setData(response.data);
    } catch (err) {
      console.error("Произошла ошибка", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [url]);

  return [data, loading];
};
