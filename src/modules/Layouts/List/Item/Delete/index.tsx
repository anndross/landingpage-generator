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
import { Input } from "@/components/ui/input";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteAction } from "@/modules/Layouts/List/Item/Delete/Action";
import { ItemProps } from "@/modules/Layouts/List/Item";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type DeleteLayoutFormData = {
  name: string;
};

export function Delete({ layout: { name, id } }: ItemProps) {
  const [open, setOpen] = useState(false);

  const deleteLayoutFormSchema = z.object({
    name: z
      .string()
      .nonempty("O nome é obrigatório")
      .regex(new RegExp(name), "O nome não coincide com o original"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DeleteLayoutFormData>({
    resolver: zodResolver(deleteLayoutFormSchema),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="p-0 h-8 w-8 aspect-square" variant="outline">
          <RiDeleteBin6Line color="#000" size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tem certeza que deseja deletar?</DialogTitle>
          <DialogDescription>
            Digite o nome do layout para confirmar: {name}
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit((data) => {
            if (data.name !== name) {
              return;
            }

            deleteAction(id);
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
                placeholder={name}
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
            <Button type="submit" variant="destructive">
              Deletar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
