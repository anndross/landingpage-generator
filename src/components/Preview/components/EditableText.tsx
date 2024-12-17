import { ItemType } from "@/components/Sections"
import { updateFinalComponent, updateVtexIoComponents } from "../hooks/updateFinalComponent"
import { ChangeEvent, useEffect, useRef } from "react"

export interface EditableText {
    value: string
    code: any
    setCode: (code: any) => void
}
  
export function EditableText({value, code, setCode}: EditableText) {
    const ref = useRef<HTMLInputElement>(null)

    function handleUpdate(event: ChangeEvent<HTMLInputElement>) {
        const content = event.target.value

        const newCode = updateFinalComponent('text', content, code) 

        console.log('newCode: ', newCode)
        setCode(newCode)
    } 

    return (
      <input ref={ref} onChange={handleUpdate} type="text" defaultValue={value} />
    )
}
  