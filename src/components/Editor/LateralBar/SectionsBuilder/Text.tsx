import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TextProps {
  clear: () => void;
}

export function Text({ clear }: TextProps) {
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

  const handleToAdd = async () => {
    await fetch("/api/create-element", {
      method: "POST",
      body: JSON.stringify({
        teste: "testeeeee",
      }),
    });

    clear();
  };

  return (
    <div>
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
      <Button onClick={handleToAdd}>Adicionar</Button>
    </div>
  );
}
