import { ItemType } from "@/components/Sections"
import { updateFinalComponent, updateVtexIoComponents } from "../hooks/updateFinalComponent"
import { ChangeEvent, useContext, useEffect, useRef } from "react"
import CodeContext from "../context"

export interface EditableText {
    value: string
}
  
export function EditableText({value}: EditableText) {
    const { code, setCode } = useContext(CodeContext)


    const ref = useRef<HTMLInputElement>(null)

    function updateContent(content: string) {
        const newCode = updateFinalComponent('text', content, code) 
        setCode((prev: any) => ({...prev, ...newCode}))
    }

    useEffect(() => {
        updateContent(value)
    }, [])

    function handleUpdate(event: ChangeEvent<HTMLInputElement>) {
        const content = event.target.value
        updateContent(content)
    } 

    return (
      <input ref={ref} onChange={handleUpdate} type="text" defaultValue={value} />
    )
}
  