import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

interface ContainerRootProps {
  children: ReactNode | ReactNode[];
}

export function ContainerRoot({ children }: ContainerRootProps) {
  return (
    <form className="flex flex-col gap-6 pb-2">
      {children}
      <Button className="w-full" type="submit">
        Salvar
      </Button>
    </form>
  );
}
