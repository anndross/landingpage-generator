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
import {
  RxCornerBottomLeft,
  RxCornerBottomRight,
  RxCornerTopLeft,
  RxCornerTopRight,
} from "react-icons/rx";
import { GetCurrentStyles, UpdateCurrentStyles } from "../../hooks";

export function Appearance() {
  return (
    <div className="">
      <span className="text-sm text-zinc-600 font-medium">Aparência</span>
      <div className="flex flex-col gap-2">
        <ColorPicker
          color={GetCurrentStyles("backgroundColor") || "#fff"}
          setColor={(color) =>
            UpdateCurrentStyles({
              backgroundColor: color,
            })
          }
        />
        <div className="flex gap-2">
          <Input
            max={1}
            min={0}
            value={GetCurrentStyles("opacity")}
            onChange={(evt) =>
              UpdateCurrentStyles({
                opacity: evt.target.value,
              })
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
  const [radiusTopLeft, radiusTopRight, radiusBottomRight, radiusBottomLeft] =
    GetCurrentStyles("borderRadius")
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
              UpdateCurrentStyles({
                borderRadius: `${evt.target.value || 0}px ${radiusTopRight || 0}px ${radiusBottomRight || 0}px ${radiusBottomLeft || 0}px`,
              });
            }}
            icon={RxCornerTopLeft}
          />
          <InputWithIcon
            value={radiusTopRight}
            onChange={(evt) => {
              UpdateCurrentStyles({
                borderRadius: `${radiusTopLeft || 0}px ${evt.target.value || 0}px ${radiusBottomRight || 0}px ${radiusBottomLeft || 0}px`,
              });
            }}
            icon={RxCornerTopRight}
          />
          <InputWithIcon
            value={radiusBottomRight}
            onChange={(evt) =>
              UpdateCurrentStyles({
                borderRadius: `${radiusTopLeft || 0}px ${radiusTopRight || 0}px ${evt.target.value || 0}px ${radiusBottomLeft || 0}px`,
              })
            }
            icon={RxCornerBottomLeft}
          />
          <InputWithIcon
            value={radiusBottomLeft}
            onChange={(evt) =>
              UpdateCurrentStyles({
                borderRadius: `${radiusTopLeft || 0}px ${radiusTopRight || 0}px ${radiusBottomRight || 0}px ${evt.target.value || 0}px`,
              })
            }
            icon={RxCornerBottomRight}
          />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
