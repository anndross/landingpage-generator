import { PreviewElement, WrapperProps } from "@/components/Preview/context";
import { useContext, useEffect } from "react";
import { Text as EditableText } from "@/mappedComponents/editableComponents/Text";
import { ReactSortable } from "react-sortablejs";
import LayoutContext from "@/components/Preview/Layout/context";

export function Wrapper({
  id: wrapperId,
  childs,
}: {
  id: string;
  childs: PreviewElement[];
}) {
  const { state, setState } = useContext(LayoutContext);

  const indexOfWrapper = state.findIndex((data) => data.id === wrapperId);

  const wrapper =
    indexOfWrapper !== -1
      ? (state[indexOfWrapper] as WrapperProps)
      : { childs: [] };

  console.log("Wrapper", state);

  return (
    <div>
      <ReactSortable
        tag={"div"}
        id={wrapperId}
        group={{
          name: "shared",
          pull: true,
          put: true,
        }}
        animation={150}
        swapThreshold={0.65}
        fallbackOnBody
        ghostClass="ghost"
        className="flex select-none items-start w-full h-52 p-1 px-2 gap-1 border "
        list={childs}
        setList={(newState) => {
          setTimeout(() => {
            const mappedNewState = newState.map((item: PreviewElement) => ({
              ...item,
              id: item.id?.startsWith("clone-")
                ? item.id
                : `clone-${crypto.randomUUID()}`,
            }));

            setState((prev) => {
              let newPrev = prev.map((item) =>
                item.id === wrapperId
                  ? { ...item, childs: [...mappedNewState] }
                  : item
              );

              // Remover elementos com base nos IDs sem mutação
              const idsToRemove = new Set(mappedNewState.map((el) => el.id));
              newPrev = newPrev.filter((item) => !idsToRemove.has(item.id));

              console.log("Wrapper newPrev", newPrev);
              return newPrev;
            });
          }, 200);
          // console.log(" newState", newState);
        }}
      >
        {childs.map((item, i) => {
          return <div key={item.id}>Texto</div>;
        })}
      </ReactSortable>
    </div>
  );
}
