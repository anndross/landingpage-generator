import { Appearance } from "@/modules/Editor/Manager/SubEditor/mappedElements/common/Appearance";
import { Border } from "@/modules/Editor/Manager/SubEditor/mappedElements/common/Border";
import { Spacing } from "@/modules/Editor/Manager/SubEditor/mappedElements/common/Spacing";
import { ContainerPosition } from "./ContainerPosition";
import { ContainerRoot } from "./ContainerRoot";
import { Size } from "@/modules/Editor/Manager/SubEditor/mappedElements/common/Size";

export const Container = {
  Root: ContainerRoot,
  Size,
  Border,
  Appearance,
  Spacing,
  Position: ContainerPosition,
};
