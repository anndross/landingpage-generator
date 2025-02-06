"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useContext } from "react";
import Context from "../CreateContext";
import { handleToAdd } from "./Action";
import { BiAlignLeft, BiAlignMiddle, BiAlignRight } from "react-icons/bi";

export function ElementWrapper() {
  const { setValue } = useContext(Context);

  return (
    <form
      action={handleToAdd}
      onSubmit={() => setValue("")}
      className="flex flex-col gap-2"
    >
      <div className="flex flex-col gap-2">
        <div className="w-full flex justify-between">
            <Button><BiAlignLeft/></Button>
            <Button><BiAlignMiddle/></Button>
            <Button><BiAlignRight/></Button>
        </div>

        <div className="w-full flex justify-between">
            <Button></Button>
            <Button></Button>
            <Button></Button>
        </div>
      </div>
      <Button className="w-full" type="submit">
        Adicionar
      </Button>
    </form>
  );
}

interface TagSelectProps {
  defaultValue?: string;
}

export function TagSelect({ defaultValue }: TagSelectProps) {
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

  return (
    <Select defaultValue={defaultValue} required name="tag">
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
  );
}
