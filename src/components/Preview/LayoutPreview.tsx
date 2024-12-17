import { ReactSortable } from "react-sortablejs";
import { ItemType } from "../Sections";
import { FC, useState } from "react";
import { EditableImage } from "./components/EditableImage";
import { EditableText } from "./components/EditableText";


interface LayoutPreviewProps {
    code: any
    setCode: (code: any) => void
}

export const LayoutPreview = ({code, setCode}: LayoutPreviewProps) => {
    const [state, setState] = useState<ItemType[]>([
    ]);

    const components = {
        image: EditableImage,
        text: EditableText
    }

    return (
        <ReactSortable 
            className="w-full h-full bg-slate-200 rounded-lg p-4 flex flex-col"
            group={{
                name: 'shared',
                pull: true,
                put: true
            }} 
            list={state} 
            setList={setState}
        >
                {state.map((item) => {
                    const Component = components[item.type]

                    return  <Component value={item.name} key={item.id} code={code} setCode={setCode} />
            })}
        </ReactSortable>
    )
}