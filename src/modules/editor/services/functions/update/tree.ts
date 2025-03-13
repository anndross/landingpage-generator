import { EditorStore, ElementsType } from "@/modules/editor/store";
import { UpdateBase } from "@/modules/editor/services/functions/update";
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
      const node = this.node as ElementsType;

      let currentChildren = tree?.children;

      const pathIds = node.index;

      for (const id of pathIds) {
        const childIndex = currentChildren.findIndex((e) => e.id === id);

        if (childIndex > -1)
          currentChildren = currentChildren[childIndex]?.children;
      }

      const indeexOfElementToUpdate = currentChildren.findIndex(
        (e) => e.id === node.id
      );

      if (indeexOfElementToUpdate > -1) {
        currentChildren[indeexOfElementToUpdate] = node;
      }

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
