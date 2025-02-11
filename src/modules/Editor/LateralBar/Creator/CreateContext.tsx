import { createContext, Dispatch, SetStateAction } from "react";

interface ContextI {
  value: string;
  setValue: Dispatch<SetStateAction<ContextI["value"]>>;
}

const Context = createContext<ContextI>({
  value: "",
  setValue: () => {},
});

export default Context;
