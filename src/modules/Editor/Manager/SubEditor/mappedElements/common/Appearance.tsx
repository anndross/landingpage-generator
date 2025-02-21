import { ColorPicker } from "@/components/ColorPicker";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { InputWithIcon } from "@/components/ui/input-with-icon";
import { useEditor } from "@/modules/Editor/EditorContext";
import {
  RxCornerBottomLeft,
  RxCornerBottomRight,
  RxCornerTopLeft,
  RxCornerTopRight,
} from "react-icons/rx";

export function Appearance() {
  const {
    useEditElement,
    subEditor: { element: Element },
  } = useEditor();

  const element = Element as any;

  return (
    <div className="">
      <span className="text-sm text-zinc-600 font-medium">Aparência</span>
      <div className="flex flex-col gap-2">
        <ColorPicker
          color={element?.style.backgroundColor || "#fff"}
          setColor={(color) =>
            useEditElement({
              ...element,
              style: { ...element?.style, backgroundColor: color },
            } as any)
          }
        />
        <div className="flex gap-2">
          <Input
            max={1}
            min={0}
            value={element?.style.opacity}
            onChange={(evt) =>
              useEditElement({
                ...element,
                style: { ...element?.style, opacity: evt.target.value },
              } as any)
            }
            type="number"
            placeholder="Opacidade"
          />
          <AppearanceRadius />
        </div>
      </div>
    </div>
  );
}

function AppearanceRadius() {
  const {
    useEditElement,
    subEditor: { element },
  } = useEditor();

  const [radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft] =
    (element as any)?.style.borderRadius
      ?.split(" ")
      ?.map((radius: string) => radius.replace(/\D/g, "").trim()) || [];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <RxCornerTopLeft />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup className="grid grid-cols-2 gap-1 p-1">
          <InputWithIcon
            value={radiusTopLeft}
            onChange={(evt) => {
              useEditElement({
                ...element,
                style: {
                  ...element?.style,
                  borderRadius: `${evt.target.value || 0}px ${radiusTopRight || 0}px ${radiusBottomRight || 0}px ${radiusBottomLeft || 0}px`,
                },
              } as any);
            }}
            icon={RxCornerTopLeft}
          />
          <InputWithIcon
            value={radiusTopRight}
            onChange={(evt) => {
              useEditElement({
                ...element,
                style: {
                  ...element?.style,
                  borderRadius: `${radiusTopLeft || 0}px ${evt.target.value || 0}px ${radiusBottomRight || 0}px ${radiusBottomLeft || 0}px`,
                },
              } as any);
            }}
            icon={RxCornerTopRight}
          />
          <InputWithIcon
            value={radiusBottomRight}
            onChange={(evt) =>
              useEditElement({
                ...element,
                style: {
                  ...element?.style,
                  borderRadius: `${radiusTopLeft || 0}px ${radiusTopRight || 0}px ${evt.target.value || 0}px ${radiusBottomLeft || 0}px`,
                },
              } as any)
            }
            icon={RxCornerBottomLeft}
          />
          <InputWithIcon
            value={radiusBottomLeft}
            onChange={(evt) =>
              useEditElement({
                ...element,
                style: {
                  ...element?.style,
                  borderRadius: `${radiusTopLeft || 0}px ${radiusTopRight || 0}px ${radiusBottomRight || 0}px ${evt.target.value || 0}px`,
                },
              } as any)
            }
            icon={RxCornerBottomRight}
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
