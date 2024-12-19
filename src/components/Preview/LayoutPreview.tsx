import { ReactSortable } from "react-sortablejs";
import { ItemType } from "../Sections";
import { FC, useId, useState } from "react";
import { EditableImage } from "./components/EditableImage";
import { EditableText } from "./components/EditableText";

export const LayoutPreview = () => {
    const [state, setState] = useState<ItemType[]>([
    ]);
    const id = useId()


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
                put: true,
            }}
            dropBubble
            list={state} 
            setList={(newState, sortable, store) => {
                console.log(`newState`, newState)
                console.log(`sortable`, sortable)
                console.log(`store`, store)
                setState(Array.from(new Map(newState.map(obj => [obj.id + id, obj])).values()))
            }}
        >
                {state.map((item) => {
                    const Component = components[item.type]

                    return  <Component value={item.name} key={item.id} />
            })}
        </ReactSortable>
    )
}