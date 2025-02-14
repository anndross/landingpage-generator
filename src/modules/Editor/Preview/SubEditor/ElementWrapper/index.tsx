"use client";
import { Button } from "@/components/ui/button";
import { handleToAdd } from "./Action";
import { BiAlignLeft, BiAlignMiddle, BiAlignRight } from "react-icons/bi";
import {
  MdOutlineVerticalAlignBottom,
  MdOutlineVerticalAlignCenter,
  MdOutlineVerticalAlignTop,
} from "react-icons/md";
import { TbBaselineDensityMedium } from "react-icons/tb";
import { PiTextColumns } from "react-icons/pi";
import { RadioWithIcon } from "@/components/ui/radio-with-icon";

export function ElementWrapper() {
  return (
    <form action={handleToAdd} className="flex flex-col gap-2">
      <div className="flex flex-col gap-6 pb-2">
        <div>
          <span className="text-sm text-zinc-600 font-medium">Direção</span>
          <div className="w-full flex justify-start mt-2 gap-14">
            <div>
              <RadioWithIcon
                title="Coluna"
                ariaLabel="Direção em coluna"
                id="column"
                value="column"
                name="direction"
                required
              >
                <PiTextColumns />
              </RadioWithIcon>
            </div>
            <div>
              <RadioWithIcon
                title="Linha"
                ariaLabel="Direção em linha"
                id="line"
                value="line"
                name="direction"
                required
              >
                <TbBaselineDensityMedium />
              </RadioWithIcon>
            </div>
          </div>
        </div>

        <div>
          <span className="text-sm text-zinc-600 font-medium">
            Alinhamento horizontal
          </span>
          <div className="w-full flex mt-2 gap-14">
            <div>
              <RadioWithIcon
                title="Esquerda"
                ariaLabel="Alinhamento horizontal na esquerda"
                id="horizontal-left"
                value="left"
                name="horizontal"
                required
              >
                <BiAlignLeft />
              </RadioWithIcon>
            </div>

            <div>
              <RadioWithIcon
                title="Centro"
                ariaLabel="Alinhamento horizontal no centro"
                id="horizontal-center"
                value="center"
                name="horizontal"
                required
              >
                <BiAlignMiddle />
              </RadioWithIcon>
            </div>

            <div>
              <RadioWithIcon
                title="Direita"
                ariaLabel="Alinhamento horizontal na direita"
                id="horizontal-right"
                value="right"
                name="horizontal"
                required
              >
                <BiAlignRight />
              </RadioWithIcon>
            </div>
          </div>
        </div>

        <div>
          <span className="text-sm text-zinc-600 font-medium">
            Alinhamento vertical
          </span>
          <div className="w-full flex mt-2 gap-14">
            <div>
              <RadioWithIcon
                title="Superior"
                ariaLabel="Alinhamento vertical superior"
                id="vertical-top"
                value="top"
                name="vertical"
                required
              >
                <MdOutlineVerticalAlignTop />
              </RadioWithIcon>
            </div>
            <div>
              <RadioWithIcon
                title="Meio"
                ariaLabel="Alinhamento vertical no meio"
                id="vertical-mid"
                value="mid"
                name="vertical"
                required
              >
                <MdOutlineVerticalAlignCenter />
              </RadioWithIcon>
            </div>

            <div>
              <RadioWithIcon
                title="Inferior"
                ariaLabel="Alinhamento vertical inferior"
                id="vertical-bottom"
                value="bottom"
                name="vertical"
                required
              >
                <MdOutlineVerticalAlignBottom />
              </RadioWithIcon>
            </div>
          </div>
        </div>
      </div>
      <Button className="w-full" type="submit">
        Salvar
      </Button>
    </form>
  );
}
