"use client";
import { getEditableComponent } from "@/mappedComponents/utils/getEditableComponent";
import PreviewContext, {
  PreviewElement,
} from "@/modules/Editor/Preview/context";
import clsx from "clsx";
import { useContext } from "react";
// import  { PreviewContextI } from "@/modules/Editor/Preview/context";
// import { useContext } from "react";
import { ItemInterface, ReactSortable } from "react-sortablejs";

interface SortableProps {
  state: PreviewElement[];
  setState: (newState: ItemInterface[]) => void;
  // children: ReactNode[] | undefined;
  tag: "main" | "div";
}

export function Sortable({ tag, state, setState }: SortableProps) {
  const {
    preview: { canEdit },
  } = useContext(PreviewContext);

  // console.log({ previewElements });
  return (
    <div className="w-full h-full">
      <ReactSortable
        tag={tag}
        className={clsx({
          "w-full h-full bg-white p-5 flex flex-col": true,
          "border border-zinc-400": tag !== "main",
        })}
        group={{
          name: "shared",
          pull: true,
          put: true,
        }}
        animation={150}
        swapThreshold={0.65}
        fallbackOnBody
        ghostClass="ghost"
        list={state || []}
        setList={(newState) => {
          setState(newState);
          // const mappedNewState = newState.map((item) => ({
          //   ...item,
          //   id: item.id?.startsWith("clone-")
          //     ? item.id
          //     : `clone-${crypto.randomUUID()}`,
          // }));

          // setState({ children: mappedNewState });
        }}
      >
        {state.map((item) => {
          const element = getEditableComponent(item.type, canEdit, item);

          return element;
        })}
      </ReactSortable>
    </div>
  );
}

// const [id, setId] = useState("");

// useEffect(() => {
//   setId(`new-${crypto.randomUUID()}`);
// }, []);
