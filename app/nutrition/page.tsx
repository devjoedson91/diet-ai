"use client";

import Header from "@/components/header";
import Loading from "@/components/loading";
import { api } from "@/services/api";
import { useDataStore } from "@/store/data";
import { Data } from "@/types";
import { useQuery } from "@tanstack/react-query";

interface ResponseData {
  data: Data;
}

export default function Nutrition() {
  const user = useDataStore((state) => state.user);

  const { data, isFetching, error } = useQuery({
    queryKey: ["nutrition"],
    queryFn: async () => {
      try {
        if (!user) {
          throw new Error("Faled load nutrition");
        }

        const response = await api.get<ResponseData>("/teste");

        // const response = await api.post("/create", {
        //   name: user.name,
        //   age: user.age,
        //   gender: user.gender,
        //   height: user.height,
        //   level: user.level,
        //   objective: user.objective,
        //   weight: user.weight,
        // });

        return response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  if (isFetching) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loading description="Estamos gerando sua dieta..." />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <Header title="Minha dieta" />
    </div>
  );
}
