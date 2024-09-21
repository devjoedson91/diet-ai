"use client";

import Header from "@/components/header";
import ControlSelect from "@/components/control-select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import ScreenButton from "@/components/screen-button";
import { useDataStore } from "@/store/data";
import { useRouter } from "next/navigation";

const genderOptions = [
  {
    value: "masculino",
    label: "Masculino",
  },
  {
    value: "feminino",
    label: "Feminino",
  },
];

const levelOptions = [
  {
    label: "Sedentário (pouco ou nenhuma atividade física)",
    value: "Sedentário",
  },
  {
    label: "Levemente ativo (exercícios 1 a 3 vezes na semana)",
    value: "Levemente ativo (exercícios 1 a 3 vezes na semana)",
  },
  {
    label: "Moderadamente ativo (exercícios 3 a 5 vezes na semana)",
    value: "Moderadamente ativo (exercícios 3 a 5 vezes na semana)",
  },
  {
    label: "Altamente ativo (exercícios 5 a 7 dia por semana)",
    value: "Altamente ativo (exercícios 5 a 7 dia por semana)",
  },
];

const objectiveOptions = [
  { label: "Emagrecer", value: "emagrecer" },
  { label: "Hipertrofia", value: "Hipertrofia" },
  { label: "Hipertrofia + Definição", value: "Hipertrofia e Definição" },
  { label: "Definição", value: "Definição" },
];

const formSchema = z.object({
  gender: z.string({ message: "Selecione o sexo" }),
  objective: z.string({ message: "Informe o objetivo" }),
  level: z
    .string({ message: "Informe o nível de atividade física" })
    .min(1, { message: "Informe a altura" }),
});

export default function Create() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const setPageTwo = useDataStore((state) => state.setPageTwo);

  function handleSubmit(data: z.infer<typeof formSchema>) {
    setPageTwo({
      gender: data.gender,
      level: data.level,
      objective: data.objective,
    });

    router.push("/nutrition");
  }

  return (
    <div className="flex flex-col h-screen">
      <Header title="Finalizando dieta" step="Passo 2" />
      <div className="flex flex-1 px-6 py-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full flex flex-col gap-5"
          >
            <ControlSelect
              control={form.control}
              label="Sexo"
              options={genderOptions}
              name="gender"
            />

            <ControlSelect
              control={form.control}
              label="Nível de atividade física"
              options={levelOptions}
              name="level"
            />

            <ControlSelect
              control={form.control}
              label="Objetivo"
              options={objectiveOptions}
              name="objective"
            />

            <ScreenButton type="submit">Gerar dieta</ScreenButton>
          </form>
        </Form>
      </div>
    </div>
  );
}
