import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Search() {
  return (
    <div className="p-24 pb-0 flex">
      <Input className="h-12" placeholder="Pesquise seus layouts..." />
      <Button className="h-full!">Novo</Button>
    </div>
  );
}
