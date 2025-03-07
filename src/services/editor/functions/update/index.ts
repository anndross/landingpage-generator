import { EditorStore, EditorStoreFunctionsType } from "@/modules/Editor/store";
import { EditorFunctions } from "./editorFunctions";
import { Tree } from "./tree";
import { CombineMixins } from "@/types/mixins";

export class UpdateBase {
  protected editorFunctions: EditorStoreFunctionsType;
  protected tree: EditorStore["layout"];

  constructor(
    editorFunctions: EditorStoreFunctionsType,
    tree: EditorStore["layout"]
  ) {
    this.editorFunctions = editorFunctions;
    this.tree = tree;
  }
}

const mixinsFunctions = [EditorFunctions, Tree];

export const Update = mixinsFunctions.reduce(
  (Base, Mixin) => Mixin(Base),
  UpdateBase
) as CombineMixins<typeof UpdateBase, typeof mixinsFunctions>;
