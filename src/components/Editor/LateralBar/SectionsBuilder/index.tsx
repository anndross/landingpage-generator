"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import componentsOptions from "@/data/componentsOptions.json";
import { ReactNode, useState } from "react";
import { Text } from "./Text";
import { Image } from "./Image";

export function CreateSection() {
  const [value, setValue] = useState<string>("");

  const clear = () => setValue("");

  const components: { [key: string]: ReactNode } = {
    text: <Text clear={clear} />,
    image: <Image />,
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <div className="w-full">
        <Select
          value={value}
          onValueChange={(value) => {
            setValue(value);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder={"Crie uma seção"} />
          </SelectTrigger>
          <SelectContent>
            {componentsOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {components[value]}
    </div>
  );
}
