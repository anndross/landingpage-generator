import { ReactSortable } from "react-sortablejs";
import { useState } from "react";
import { PreviewElements } from "../context";
// import { Text } from "@/editableComponents/Text";
import { Image as EditableImage } from "@/editableComponents/Image";

export const LayoutPreview = () => {
  const [state, setState] = useState<PreviewElements[]>([]);

  // const components = {
  //   image: EditableImage,
  //   text: Text,
  // };
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
        // const Component = components[item.type];

        return <EditableImage key={item.id} />;
      })}
    </ReactSortable>
  );
};
