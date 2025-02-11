import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { handleToDelete } from "./Action";

interface DeleteModalProps {
  id: string;
}

export function DeleteModal({ id }: DeleteModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <XMarkIcon className="cursor-pointer" width={18} height={18} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={() => handleToDelete(id)}>
          <DialogHeader>
            <DialogTitle>Tem certeza que deseja deletar?</DialogTitle>
            <DialogDescription>
              Se deletar perderá permanentemente esses dados.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-4 pt-4">
            <Button variant="outline" className="w-full">
              Não
            </Button>
            <Button variant="destructive" className="w-full">
              Deletar
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
