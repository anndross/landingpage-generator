"use client";
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
import { Breakpoints, useEditorStore } from "@/modules/Editor/store";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function PreviewDropdown({}) {
  const { setEditorFunctions } = useEditorStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Preview</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel>Layout</DropdownMenuLabel>
        <DropdownMenuGroup>
          <ToggleLayoutSize />
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Código</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() =>
              setEditorFunctions({
                viewLayout: false,
                codeSelection: {
                  language: "VTEX IO",
                  viewStyles: false,
                },
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

function ToggleLayoutSize() {
  const {
    setEditorFunctions,
    editorFunctions: { breakpoint },
  } = useEditorStore();

  return (
    <ToggleGroup
      onValueChange={(value) =>
        setEditorFunctions({ breakpoint: value as Breakpoints })
      }
      className="justify-start"
      value={breakpoint}
      defaultValue="lg"
      type="single"
    >
      <ToggleGroupItem value="lg" aria-label="Toggle lg">
        desktop
      </ToggleGroupItem>
      <ToggleGroupItem value="md" aria-label="Toggle md">
        tablet
      </ToggleGroupItem>
      <ToggleGroupItem value="sm" aria-label="Toggle sm">
        celular
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
