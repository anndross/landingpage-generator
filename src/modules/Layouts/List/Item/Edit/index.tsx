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
import { TbEdit } from "react-icons/tb";
import { editAction } from "@/modules/Layouts/List/Item/Edit/Action";
import { Input } from "@/components/ui/input";
import { ItemProps } from "@/modules/Layouts/List/Item";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

type EditLayoutFormData = {
  name: string;
};

export function Edit({ layout: { name, id, children } }: ItemProps) {
  const [open, setOpen] = useState(false);

  const editLayoutFormSchema = z.object({
    name: z.string().nonempty("O nome é obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditLayoutFormData>({
    resolver: zodResolver(editLayoutFormSchema),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="p-0 h-8 w-8 aspect-square" variant="outline">
          <TbEdit color="#000" size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar nome</DialogTitle>
          <DialogDescription>Edite o nome do seu layout</DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit((data) => {
            if (data.name.length) editAction(data.name, id, children);

            setOpen(false);
          })}
        >
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right whitespace-nowrap">
                Novo Nome
              </label>
              <Input
                {...register("name", { required: true })}
                defaultValue={name}
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
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
