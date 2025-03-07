import { EditorStoreFunctionsType } from "@/modules/Editor/store";
import { UpdateBase } from ".";
import { Constructor } from "@/types/mixins";

export const EditorFunctions = (Base: Constructor<UpdateBase>) =>
  class extends Base {
    updateEditorFunctions(
      data: Partial<EditorStoreFunctionsType>
    ): EditorStoreFunctionsType {
      return { ...this.editorFunctions, ...data };
    }
  };
