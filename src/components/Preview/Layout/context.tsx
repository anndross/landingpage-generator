import { createContext, Dispatch, SetStateAction } from "react";
import { PreviewElement } from "../context";

interface LayoutContextProps {
  state: PreviewElement[];
  setState: Dispatch<SetStateAction<PreviewElement[]>>;
}

const LayoutContext = createContext<LayoutContextProps>({
  state: [],
  setState: () => {},
});

export default LayoutContext;
