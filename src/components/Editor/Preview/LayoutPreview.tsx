import { ReactSortable } from "react-sortablejs";
import { useEffect, useMemo, useState } from "react";
import { EditableImage } from "./components/EditableImage";
import { EditableText } from "./components/EditableText";
import { v4 as uuidv4 } from "uuid";
import { ItemType } from "@/components/Sections";

export const LayoutPreview = () => {
    const [state, setState] = useState<ItemType[]>([]);

    const components = {
        image: EditableImage,
        text: EditableText,
    };

    // useEffect(() => {
    //     const newState = [...state]

    //     for(let i = 0; i < newState.length; i++) {
    //         for(let j = i + 1; j < newState.length; j++) {
    //             console.log(newState[i].id, i, '|', newState[j].id, j)
    //             if(newState[i].id === newState[j].id) {
    //                 newState[j].id = uuidv4()
    //                 console.log(newState)
    //             }
    //         }
    //     }      
    //     setState(newState)
    // }, [state])

    // console.log('statee', state)



    return (
        <ReactSortable
            className="w-full h-full bg-slate-200 p-4 flex flex-col"
            group={{
                name: "shared",
                pull: true,
                put: true,
            }}
            dropBubble
            list={state}
            // setList={setState}
            setList={(newState, sortable) => {
                const newNewState = newState.map((item, idx) => {
                    return {
                        ...item,
                        id: idx
                    }
                })


                setState(Array.from(new Set(newNewState)))
            }}
        >
            {state.map((item, i) => {
                const Component = components[item.type];

                return <Component value={item.name} key={item.id} />;
            })}
        </ReactSortable>
    );
};
