import { InputWithIcon } from "@/components/ui/input-with-icon";
import { useEffect, useState } from "react";
import { TbBaselineDensityMedium } from "react-icons/tb";
import { useDebouncedUpdateCurrentStyles } from "@/modules/editor/hooks";

type GapData = { columnGap: string; rowGap: string };

export function SpacingGap() {
  const [gap, setGap] = useState<GapData>({
    columnGap: "0",
    rowGap: "0",
  });

  const updateGap = (data: Partial<GapData>) => {
    setGap((prev) => ({ ...prev, ...data }));
  };

  const debouncedUpdateStyles = useDebouncedUpdateCurrentStyles();

  const TbBaselineDensityMediumRotate = () => (
    <TbBaselineDensityMedium className="rotate-90" />
  );
  const CustomTbBaselineDensityMedium = () => (
    <TbBaselineDensityMedium className="h-4" />
  );

  useEffect(() => {
    debouncedUpdateStyles(gap);
  }, [gap]);

  const getGapValue = (key: keyof GapData) => gap[key].replace(/\D/g, "");

  return (
    <div className="w-full flex gap-2">
      <InputWithIcon
        min={0}
        value={getGapValue("rowGap")}
        onChange={(evt) => {
          updateGap({
            rowGap: `${evt.target.value || 0}px`,
          });
        }}
        className="h-8 w-1/2"
        icon={CustomTbBaselineDensityMedium}
      />
      <InputWithIcon
        min={0}
        value={getGapValue("columnGap")}
        onChange={(evt) =>
          updateGap({
            columnGap: `${evt.target.value || 0}px`,
          })
        }
        className="h-8 w-1/2"
        icon={TbBaselineDensityMediumRotate}
      />
    </div>
  );
}
