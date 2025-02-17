"use client";
import { ReactSortable } from "react-sortablejs";

import { LuSquareDashed } from "react-icons/lu";
import { GenericElement } from "../GenericElement";

export function Wrapper() {
  return <GenericElement name="Container" icon={LuSquareDashed} />;
}
