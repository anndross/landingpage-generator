import { Sortable } from "@/components/Sortable";
import PreviewContext, {
  PreviewElement,
  WrapperProps,
} from "@/modules/Editor/Preview/context";
import { useContext, useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";

export function Wrapper({
  id: wrapperId,
  children,
}: {
  id: string;
  children: PreviewElement[];
}) {
  const [state, setState] = useState<PreviewElement[]>([]);
  // const { setPreviewElements } = useContext(PreviewContext);

  return (
    <div>
      <Sortable setState={setState} state={state} tag="div">
        {state.map((item, i) => {
          if (item.type === "wrapper") {
            const newItem = item as WrapperProps;
            return (
              <Wrapper
                key={newItem.id}
                id={newItem.id}
                children={newItem.children}
              />
            );
          }
          return <div key={item.id}>Texto</div>;
        })}
      </Sortable>
    </div>
  );
}
