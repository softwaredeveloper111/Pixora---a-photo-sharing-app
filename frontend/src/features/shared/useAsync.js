import { useCallback, useState } from "react";
import { toast } from "react-toastify";

const useAsync = () => {

  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(null)

  const run = useCallback(async (asyncFn) => {
    setLoading(true);
    setError(null);
    try {
      return await asyncFn();
    } catch (error) {
      setError(error?.message ?? "Something went wrong");
      toast.error(error?.message ?? "Something went wrong");
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, run };
};

export default useAsync;
