"use client";

import Error from "@/components/error";
import Loading from "@/components/loading";
import ScreenButton from "@/components/screen-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { api } from "@/services/api";
import { useDataStore } from "@/store/data";
import { Data } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Clock, Share2, UtensilsCrossed } from "lucide-react";
import { useRouter } from "next/navigation";

interface ResponseData {
  data: Data;
}

export default function Nutrition() {
  const router = useRouter();

  const user = useDataStore((state) => state.user);

  const { data, isFetching, error, isError, isSuccess } = useQuery({
    queryKey: ["nutrition"],
    queryFn: async () => {
      try {
        if (!user) return;

        const response = await api.post<ResponseData>("/create", {
          name: user.name,
          age: user.age,
          gender: user.gender,
          height: user.height,
          level: user.level,
          objective: user.objective,
          weight: user.weight,
        });

        return response.data.data;
      } catch (error) {
        console.log(error);
      }
    },
    refetchOnWindowFocus: false,
  });

  async function handleShare() {
    if (data && Object.keys(data).length === 0) return;

    const suplementos = `${data?.suplementos.map((item) => `${item}`)}`;

    const foods = `${data?.refeicoes.map(
      (item) =>
        `\n- Nome: ${item.nome}\n- horário: ${
          item.horario
        }\n- Alimentos: ${item.alimentos.map((alimento) => ` ${alimento}`)}`
    )}`;

    const message = `Dieta: ${data?.nome} - Objetivo: ${data?.objetivo}\n\n${foods}\n\n- Dica suplementos: ${suplementos}`;

    // await Share.share({
    //     message: message
    // })

    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappURL, "_blank");
  }

  if (isFetching) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loading description="Estamos gerando sua dieta..." />
      </div>
    );
  }

  if (isError) {
    return <Error message="Falha ao gerar sua dieta" error={error.message} />;
  }

  return (
    <div className="flex flex-col h-screen">
      <Card className="rounded-t-none rounded-b-2xl">
        <CardContent className="w-full h-[140px] flex items-center justify-between text-black">
          <h1 className="text-2xl font-bold text-background">Minha dieta</h1>
          <Button
            variant="outline"
            className="bg-blue w-36 px-2 text-white flex justify-between items-center"
            disabled={!isSuccess}
            onClick={handleShare}
          >
            <h2>Compartilhar</h2>
            <Share2 size={20} />
          </Button>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-4 flex-1 px-6 py-4">
        {data && Object.keys(data).length > 0 && (
          <>
            <h1 className="text-xl font-bold">{data.nome}</h1>
            <h3 className="text-base">
              <strong>Foco: </strong>
              {data.objetivo}
            </h3>
            <h3 className="font-bold text-base">Refeições:</h3>
            <Card>
              <CardContent className="p-4 flex flex-col gap-4">
                {data.refeicoes.map((refeicao) => (
                  <div
                    key={refeicao.nome}
                    className="bg-slate-100 p-4 rounded flex flex-col gap-2"
                  >
                    <div className="flex items-center justify-between">
                      <h1 className="text-base font-bold">{refeicao.nome}</h1>
                      <UtensilsCrossed size={16} />
                    </div>

                    <div className="flex items-center gap-4">
                      <Clock size={14} />
                      <h1>{refeicao.horario}</h1>
                    </div>

                    <h1 className="text-base font-bold">Alimentos:</h1>

                    {refeicao.alimentos.map((alimento) => (
                      <h2 key={alimento}>{alimento}</h2>
                    ))}
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="bg-white p-4 rounded-lg text-black">
              <h1 className="font-bold text-base">Dica de suplementos:</h1>
              {data.suplementos.map((suplemento) => (
                <h2 key={suplemento}>{suplemento}</h2>
              ))}
            </div>

            <ScreenButton onClick={() => router.replace("/step")}>
              Gerar nova dieta
            </ScreenButton>
          </>
        )}
      </div>
    </div>
  );
}
