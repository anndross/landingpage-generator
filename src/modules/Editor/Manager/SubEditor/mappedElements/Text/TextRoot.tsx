import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface TextRootProps {
  children: ReactNode | ReactNode[];
}

export function TextRoot({ children }: TextRootProps) {
  return (
    <form className="flex flex-col gap-2">
      {children}

      <Button className="w-full" type="submit">
        Salvar
      </Button>
    </form>
  );
}
