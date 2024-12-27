import { ReactSortable } from "react-sortablejs";
import { useState } from "react";
import { PreviewElements } from "../context";
import { Text as EditableText } from "@/editableComponents/Text";
import { ElementsPreviewAction } from "./ElementsPreviewAction";
// import { Image as EditableImage } from "@/editableComponents/Image";

export const LayoutPreview = () => {
  const [state, setState] = useState<PreviewElements[]>([]);

  return (
    <ReactSortable
      className="w-full h-full bg-slate-200 p-4 flex flex-col"
      group={{
        name: "elements",
        pull: true,
        put: true,
      }}
      dropBubble
      list={state}
      onSort={async () => {
        await ElementsPreviewAction(state);
      }}
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
        return <EditableText content={item.name} key={item._id} />;
      })}
    </ReactSortable>
  );
};
