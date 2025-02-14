import { Sortable } from "@/components/Sortable";
import { useEditor } from "@/modules/Editor/EditorContext";
// import { getEditableComponent } from "@/mappedComponents/utils/getEditableComponent";
// import { getEditableComponent } from "@/mappedComponents/utils/getEditableComponent";
import { WrapperProps } from "@/types/components/wrapper";
// import { useEffect, useState } from "react";

export function Wrapper({ children, indexPath }: WrapperProps) {
  const { setPreviewElements } = useEditor();

  // function findPathByIndex(
  //   root: PreviewElement[],
  //   targetId: string,
  //   path: number[] = []
  // ): null | number[] {
  //   if (!root) return null;
  //   console.log("findPathByIndex", root, targetId, path);
  //   // if (root.id === targetId) return path;

  //   // Verifica se o nó é um wrapper e possui children
  //   for (let i = 0; i < root.length; i++) {
  //     if (root[i].type === "wrapper" && Array.isArray(root[i].children)) {
  //       const result = findPathByIndex(root[i].children, targetId, [
  //         ...path,
  //         i,
  //       ]);
  //       if (result) return result;
  //     }
  //   }

  //   return null;
  // }
  function setChildrenByPath(root: any, path: number[], newChildren: any) {
    let current = root;

    console.log(
      "setChildrenByPath - line 35:",
      current,
      root,
      path,
      newChildren
    );

    for (let i = 0; i < path.length; i++) {
      if (
        !current ||
        current?.type !== "wrapper" ||
        !Array.isArray(current.children)
      ) {
        console.log(
          "setChildrenByPath - line 44:",
          current,
          root,
          path,
          newChildren
        );
        console.error("Caminho inválido: nó intermediário não é um wrapper");
        return;
      }
      current = current.children[path[i]];
    }

    // Verifica se o nó final é um wrapper antes de definir children
    if (current?.type === "wrapper") {
      current.children = newChildren;
    } else {
      throw new Error("Nó alvo não é um wrapper e não pode ter children");
    }
  }

  return (
    <Sortable
      state={children}
      setState={(newState) => {
        const id = `clone-${crypto.randomUUID()}`;

        const mappedNewState = newState.map((item, index) => ({
          ...item,
          id: item.id.toString()?.startsWith("clone-") ? item.id : id,
          indexPath: [...(indexPath || []), index],
        }));

        setPreviewElements((prev) => {
          const prevClone = { type: "wrapper", ...prev };

          setChildrenByPath(prevClone, indexPath, mappedNewState);

          console.log("prevClone", prevClone, mappedNewState);

          return { children: prevClone.children };
        });
      }}
      tag="div"
    />
  );
}
