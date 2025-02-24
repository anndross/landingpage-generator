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
import { handleCreateLayout } from "./CreateAction";
import { Input } from "@/components/ui/input";

export async function Create() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="h-full">Novo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar layout</DialogTitle>
          <DialogDescription>Crie o seu layout</DialogDescription>
        </DialogHeader>
        <form action={handleCreateLayout}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="text-right">
                Nome
              </label>
              <Input
                id="name"
                name="name"
                placeholder="Digite o nome do layout"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Criar</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
