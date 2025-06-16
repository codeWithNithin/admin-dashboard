import { Outlet } from "react-router-dom";
import { self } from "../http/api";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../store";
import { useEffect } from "react";
import { AxiosError } from "axios";

const getSelf = async () => {
  const { data } = await self();
  return data;
};

const Root = () => {
  const { setUser } = useAuthStore();
  const { data, isLoading } = useQuery({
    queryKey: ["self"],
    queryFn: getSelf,
    retry: (failureCount, err) => {
      // dont call self endpoint if status code is 401, else call 3 times and stop.
      if (err instanceof AxiosError && err.response?.status === 401) {
        return false;
      }

      return failureCount < 3;
    },
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }
  }, [data, setUser]);

  if (isLoading) return <div> Loading... </div>;

  return <Outlet />;
};

export default Root;
