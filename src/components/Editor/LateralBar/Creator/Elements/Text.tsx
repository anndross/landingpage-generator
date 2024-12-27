import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormEvent } from "react";

export function Text() {
  const tagOptions = [
    { value: "h1", label: "h1" },
    { value: "h2", label: "h2" },
    { value: "h3", label: "h3" },
    { value: "h4", label: "h4" },
    { value: "h5", label: "h5" },
    { value: "h6", label: "h6" },
    { value: "p", label: "p" },
    { value: "span", label: "span" },
    { value: "a", label: "a" },
  ];

  async function handleToAdd(event: FormEvent) {
    event.preventDefault();
    console.log(event);

    await fetch("/api/create-element", {
      method: "POST",
      body: JSON.stringify({
        teste: "testeeeee",
      }),
    });
  }

  return (
    <form onSubmit={handleToAdd} className="flex flex-col gap-2" method="POST">
      <div className="flex flex-col gap-2">
        <Input className="w-full" placeholder="Seu texto aqui..." />

        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={"Escolha sua tag..."} />
          </SelectTrigger>
          <SelectContent>
            {tagOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button className="w-full" type="submit">
        Adicionar
      </Button>
    </form>
  );
}
