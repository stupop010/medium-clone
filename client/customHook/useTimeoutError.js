import { useState, useEffect } from "react";

const useTimeoutError = () => {
  const [error, setError] = useState("");

  useEffect(() => {
    const errorTimer = setTimeout(() => setError(""), 3000);
    return () => clearTimeout(errorTimer);
  }, [error]);

  return [error, setError];
};

export default useTimeoutError;
