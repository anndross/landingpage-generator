import { createContext, Dispatch, SetStateAction } from "react";

interface CodeContextI {
  code: Object;
  setCode: Dispatch<SetStateAction<CodeContextI["code"]>>;
}

const CodeContext = createContext<CodeContextI>({
  code: {},
  setCode: () => {},
});

export default CodeContext;
