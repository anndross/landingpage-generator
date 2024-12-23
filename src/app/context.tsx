import { createContext } from "react";

const context = createContext<any>({
    previewElements: [],
    setPreviewElements: (elements: any) => {}
})

export default context