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
import { Label } from "@/components/ui/label";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { TagSelect } from "../../../Creator/ElementText";
import { handleToUpdate } from "./Action";

interface TextModalProps {
  value: string;
  tag: string;
  id: string;
}

export function TextModal({ tag, value, id }: TextModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <PencilSquareIcon className="cursor-pointer" width={18} height={18} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form action={(formData) => handleToUpdate(formData, id)}>
          <DialogHeader>
            <DialogTitle>Componente de texto</DialogTitle>
            <DialogDescription>Edite suas propriedades</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="w-full flex items-center gap-4">
              <Label htmlFor="value" className="text-right">
                Texto
              </Label>
              <Input
                required
                name="value"
                defaultValue={value}
                className="w-full"
                placeholder="Seu texto aqui..."
              />
            </div>
            <div className="w-full flex items-center gap-4">
              <Label htmlFor="tag" className="text-right">
                Tag
              </Label>
              <TagSelect defaultValue={tag} />
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
