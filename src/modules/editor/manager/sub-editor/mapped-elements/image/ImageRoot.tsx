import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface ImageRootProps {
  children: ReactNode | ReactNode[];
}

export function ImageRoot({ children }: ImageRootProps) {
  return (
    <form className="flex flex-col gap-4">
      {children}
      <Button className="w-full" type="submit">
        Salvar
      </Button>
    </form>
  );
}
