import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContext } from "react";
import PreviewContext from "./context";

export function PreviewDropdown({}) {
  const { setPreview } = useContext(PreviewContext);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Preview</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>Layout</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() =>
              setPreview({
                type: "layout",
                option: "desktop",
              })
            }
          >
            Desktop
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Código</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              setPreview({
                type: "code",
                option: "VTEX IO",
              })
            }
          >
            VTEX IO
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
