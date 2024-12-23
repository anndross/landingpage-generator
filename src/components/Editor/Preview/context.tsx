import { createContext } from "react";

interface CodeContextI {
    code: any
    setCode: (code: Object) => void
}

const CodeContext = createContext<CodeContextI>({
    code: {},
    setCode: (code: {}) => {}
})

export default CodeContext