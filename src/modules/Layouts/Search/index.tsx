import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PreviewElement } from "@/modules/Editor/EditorContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

interface SearchProps {
  data: PreviewElement[];
}

export function Search({}: SearchProps) {
  return (
    <div className="h-12 pb-0 flex">
      <Input className="h-full" placeholder="Pesquise seus layouts..." />
      <Create />
    </div>
  );
}

export async function Create() {
  const token = (await cookies()).get("auth_token")?.value;

  const handleCreateLayout = async (formData: FormData) => {
    "use server";

    const name = formData.get("name") || "";

    if (!name) throw new Error("O nome é obrigatório");

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    await fetch(`${baseUrl}/api/preview/create`, {
      method: "POST",
      body: JSON.stringify({ name }),
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        accept: "application/json",
        "Content-Type": "application/json",
      }),
    });

    revalidateTag("get-layouts");
  };

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
