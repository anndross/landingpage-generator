import { ReactSortable } from "react-sortablejs";
import { useState } from "react";
import { EditableImage } from "./editableComponents/EditableImage";
import { EditableText } from "./editableComponents/EditableText";
import { PreviewElements } from "../context";

export const LayoutPreview = () => {
  const [state, setState] = useState<PreviewElements[]>([]);

  const components = {
    image: EditableImage,
    text: EditableText,
  };

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
      setList={(newState) => {
        const newNewState = newState.map((item, idx) => {
          return {
            ...item,
            id: idx,
          };
        });

        setState(Array.from(new Set(newNewState)));
      }}
    >
      {state.map((item) => {
        const Component = components[item.type];

        return <Component value={item.name} key={item.id} />;
      })}
    </ReactSortable>
  );
};
