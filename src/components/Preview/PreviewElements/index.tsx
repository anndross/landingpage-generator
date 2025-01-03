import { ReactSortable } from "react-sortablejs";
import { useContext, useEffect, useState } from "react";
import { PreviewElements } from "../../Editor/context";
import { Text as EditableText } from "@/mappedComponents/editableComponents/Text";
import PreviewContext from "../context";
// import { Image as EditableImage } from "@/editableComponents/Image";

export const LayoutPreview = () => {
  const [state, setState] = useState<PreviewElements[]>([]);
  const { setPreviewElements } = useContext(PreviewContext);

  useEffect(() => {
    setPreviewElements(state);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <ReactSortable
      className="w-full h-full bg-white p-4 flex flex-col"
      group={{
        name: "elements",
        pull: true,
        put: true,
      }}
      dropBubble
      list={state}
      setList={(newState) => {
        setState(Array.from(new Set(newState)));
      }}
    >
      {state.map((item) => {
        return <EditableText as={item.tag} value={item.value} key={item.id} />;
      })}
    </ReactSortable>
  );
};
