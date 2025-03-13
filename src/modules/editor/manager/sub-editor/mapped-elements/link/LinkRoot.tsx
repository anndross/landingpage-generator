import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface LinkRootProps {
  children: ReactNode | ReactNode[];
}

export function LinkRoot({ children }: LinkRootProps) {
  return (
    <form className="flex flex-col gap-6 pb-2">
      {children}
      <Button className="w-full" type="submit">
        Salvar
      </Button>
    </form>
  );
}
