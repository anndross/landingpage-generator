"use client";
import PreviewContext, { PreviewElement } from "../context";
import { Sortable } from "@/components/Sortable";
// import { getEditableComponent } from "@/mappedComponents/utils/getEditableComponent";
import { useContext } from "react";

export const Preview = ({}: { data: [] }) => {
  const { previewElements, setPreviewElements } = useContext(PreviewContext);
  console.log("previewElements", previewElements);

  return (
    <Sortable
      state={previewElements.children}
      setState={(newState) => {
        const id = `clone-${crypto.randomUUID()}`;

        const mappedNewState = newState.map((item, index) => ({
          ...item,
          id: item.id.toString()?.startsWith("clone-") ? item.id : id,
          indexPath: [index],
        }));

        setPreviewElements({ children: mappedNewState as PreviewElement[] });
      }}
      tag="main"
    />
  );
};

// useEffect(() => {
//   async function createPreview() {
//     await fetch("/api/preview/create", {
//       method: "POST",
//       body: JSON.stringify({
//         items: state,
//       }),
//     });

//     setPreviewElements(state);
//   }

//   if (state.length) createPreview();
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [state, previewElements]);
// console.log("layout State", state);
