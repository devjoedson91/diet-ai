"use client";

import Header from "@/components/header";
import ControlSelect from "@/components/control-select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import ScreenButton from "@/components/screen-button";

const gender = [
  {
    value: "male",
    label: "Masculino",
  },
  {
    value: "female",
    label: "Feminino",
  },
];

const formSchema = z.object({
  gender: z.string({ message: "Selecione o sexo" }),
  objective: z.string({ message: "Informe o objetivo" }),
  level: z
    .string({ message: "Informe o nível de atividade física" })
    .min(1, { message: "Informe a altura" }),
});

export default function Create() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function handleSubmit(data: z.infer<typeof formSchema>) {}

  return (
    <div className="flex flex-col h-screen">
      <Header title="Finalizando dieta" step="Passo 2" />
      <div className="flex flex-1">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="w-full p-4 flex flex-col gap-5"
          >
            <ControlSelect
              control={form.control}
              label="Sexo"
              options={gender}
              name="gender"
            />

            <ScreenButton type="submit">Gerar dieta</ScreenButton>
          </form>
        </Form>
      </div>
    </div>
  );
}
