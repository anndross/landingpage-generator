"use client";
import Link from "next/link";
import { Layout } from "../../LayoutsContext";
import { Button } from "@/components/ui/button";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
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
import { handleUpdateLayout } from "./EditAction";
import { handleDeleteLayout } from "./DeleteAction";

interface PreviewProps {
  layout: Layout;
}

export function Preview({ layout }: PreviewProps) {
  return (
    <div
      className="w-80 h-56 flex flex-col rounded-lg cursor-pointer bg-white
        shadow-md border border-zinc-100 items-center p-2 relative"
    >
      <div className="flex gap-2  z-10 absolute top-1 right-1">
        <Edit layout={layout} />
        <Delete layout={layout} />
      </div>
      <Link className="w-full h-full" href={`/editor/${layout.id}`}>
        <span>{layout.name}</span>
      </Link>
    </div>
  );
}

export function Edit({ layout }: PreviewProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-0 h-8 w-8 aspect-square" variant="outline">
          <TbEdit color="#000" size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar layout</DialogTitle>
          <DialogDescription>Crie o seu layout</DialogDescription>
        </DialogHeader>
        <form action={handleUpdateLayout}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Nome
              </label>
              <Input
                id="name"
                name="name"
                defaultValue={layout?.name}
                placeholder="Digite o nome do layout"
                className="col-span-3"
              />
              <Input
                id="children"
                name="children"
                defaultValue={JSON.stringify(layout?.children)}
                className="hidden"
              />
              <Input
                id="id"
                name="id"
                defaultValue={layout?.id}
                className="hidden"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Salvar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function Delete({ layout }: PreviewProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="p-0 h-8 w-8 aspect-square" variant="outline">
          <RiDeleteBin6Line color="#000" size={14} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tem certeza que deseja deletar?</DialogTitle>
          <DialogDescription>
            Digite o nome do layout para confirmar: {layout?.name}
          </DialogDescription>
        </DialogHeader>
        <form action={handleDeleteLayout}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Nome
              </label>
              <Input
                id="name"
                name="name"
                placeholder={layout?.name}
                className="col-span-3"
              />

              <Input
                id="real-name"
                name="real-name"
                defaultValue={layout?.name}
                className="hidden"
              />
              <Input
                id="id"
                name="id"
                defaultValue={layout?.id}
                className="hidden"
              />
            </div>
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
