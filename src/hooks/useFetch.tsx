import { useEffect, useState } from "react";

type FetchHook<T> = {
  data: T | null;
  error: any;
};

export default function useFetch<T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any
): FetchHook<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      const options: any = {
        method,
        cache: "force-cache",
        headers: { "Content-Type": "application/json" },
      };
      if (body && (method === "POST" || method === "PUT")) {
        options.body = JSON.stringify(body);
      }
      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const data: T = await response.json();
          setData(data);
        } else {
          setError(Error("Server error occurred"));
        }
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [url, method, body]);
  return { data, error };
}
