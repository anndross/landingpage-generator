import { ReactSortable } from "react-sortablejs";
import { ItemType } from "../Sections";
import { useState } from "react";
import { EditableImage } from "./components/EditableImage";
import { EditableText } from "./components/EditableText";
import { nanoid } from "nanoid";

export const LayoutPreview = () => {
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
                put: true,
            }}
            dropBubble
            list={state} 
            setList={(newState, sortable, store) => {
                setState(newState)
                // function findDuplicates(arr: typeof newState) {
                //     const counts: any = {};
                //     const duplicates = [];
                  
                //     for (const item of arr) {
                //       counts[item.id] = (counts[item.id] || 0) + 1;

                //       if (counts[item.id] === 2) { // Adicionar ao array de duplicados apenas na segunda ocorrência
                //         duplicates.push(item);
                //       }
                //     }
                  
                //     return duplicates;
                // }


                // const newStateSet = new Set(newState)

                // const duplicates = findDuplicates(newState)

                // duplicates.forEach(item => {
                //     const id = nanoid()

                //     item.id = id

                //     console.log('newState', item, item.id, id)
                //     newStateSet.add(item)
                // })


                // console.log(`newState`, newState, newStateSet)
                // console.log(`sortable`, sortable)
                // console.log(`store`, store)
                // setState(Array.from(newStateSet))
            }}
        >
                {state.map((item) => {
                    const Component = components[item.type]

                    return  <Component value={item.name} key={item.id} />
            })}
        </ReactSortable>
    )
}