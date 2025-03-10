import { EditorStore, ElementsType } from "@/modules/Editor/store";
import { UpdateBase } from "@/services/editor/functions/update";
import { Constructor } from "@/types/mixins";

export const Tree = (Base: Constructor<UpdateBase>) =>
  class extends Base {
    private node: EditorStore["layout"] | ElementsType = {} as
      | EditorStore["layout"]
      | ElementsType;

    private handleRoot() {
      const newLayout: EditorStore["layout"] = {
        ...this.tree,
        ...(this.node as EditorStore["layout"]),
      };

      return newLayout;
    }

    private handleNode() {
      const tree = { ...this.tree };

      const updateNode = (node: ElementsType) => {
        let currentChildren = tree?.children;

        if (!node?.index?.length) {
          console.log("pathIdspathIds no index", node?.index?.length);

          const indexOfDirectSon = currentChildren.findIndex(
            (el) => el.id === node.id
          );

          if (indexOfDirectSon > -1) {
            return (currentChildren[indexOfDirectSon] = node);
          }
        }

        const pathIds = node.index;

        console.log("pathIdspathIds", pathIds);
        for (const id of pathIds?.slice(0, -1)) {
          const childIndex = currentChildren.findIndex((e) => e.id === id);

          if (childIndex > -1)
            currentChildren = currentChildren[childIndex]?.children;
        }

        const lastChildIndex = currentChildren.findIndex(
          (e) => e.id === pathIds[pathIds.length - 1]
        );

        if (lastChildIndex > -1) {
          currentChildren[lastChildIndex] = node;
        }
      };

      updateNode(this.node as ElementsType);

      return tree;
    }

    updateTree(
      currentNode: EditorStore["layout"] | ElementsType
    ): EditorStore["layout"] {
      this.node = currentNode;

      const nodeIsRoot = currentNode.type === "layout";

      if (nodeIsRoot) return this.handleRoot();

      return this.handleNode();
    }
  };
