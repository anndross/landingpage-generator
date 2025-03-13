import { EditorStore } from "@/modules/editor/store";
import { Tree } from "./tree";
import { CombineMixins } from "@/types/mixins";

export class UpdateBase {
  protected tree: EditorStore["layout"];

  constructor(tree: EditorStore["layout"]) {
    this.tree = tree;
  }
}

const mixinsFunctions = [Tree];

export const Update = mixinsFunctions.reduce(
  (Base, Mixin) => Mixin(Base),
  UpdateBase
) as CombineMixins<typeof UpdateBase, typeof mixinsFunctions>;
