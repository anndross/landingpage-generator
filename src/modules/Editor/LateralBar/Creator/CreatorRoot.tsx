"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Children, ReactNode, useState } from "react";
import Context from "./CreateContext";

interface CreatorRootProps {
  children: ReactNode | ReactNode[];
}

export function CreatorRoot({ children }: CreatorRootProps) {
  const [value, setValue] = useState<string>("");

  const elementsOptions = Children.toArray(children).map((child) => {
    const key =
      JSON.parse(JSON.stringify(child))?.key.toString().replace(".$", "") ||
      "defaultKey";

    return {
      value: key,
      label: child,
    };
  });

  return (
    <Context.Provider value={{ value, setValue }}>
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
              {elementsOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {elementsOptions.find((el) => el.value === value)?.label}
      </div>
    </Context.Provider>
  );
}
