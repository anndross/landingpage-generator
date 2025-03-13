"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createAction } from "./Action";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

type CreateLayoutFormData = {
  name: string;
};

export function Create() {
  const [open, setOpen] = useState(false);

  const createLayoutFormSchema = z.object({
    name: z.string().nonempty("O nome é obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateLayoutFormData>({
    resolver: zodResolver(createLayoutFormSchema),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="h-full">Novo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar layout</DialogTitle>
          <DialogDescription>Diga o nome do seu layout</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit((data) => {
            if (data.name.length) createAction(data.name);

            setOpen(false);
          })}
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Nome
              </label>
              <Input
                {...register("name", { required: true })}
                placeholder="Digite o nome do layout"
                className="col-span-3"
              />
            </div>
            {errors.name && (
              <span className="text-red-700 text-sm w-full text-right">
                {errors.name.message}
              </span>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">Criar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
