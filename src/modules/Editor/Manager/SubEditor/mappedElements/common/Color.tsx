import { ColorPicker } from "@/components/ColorPicker";
import { useCallback, useEffect, useState } from "react";
import {
  useGetCurrentStyles,
  useUpdateCurrentStyles,
} from "@/modules/Editor/Manager/SubEditor/hooks";
import { debounce } from "lodash";
import { useEditorStore } from "@/modules/Editor/store";
import { debounceTimeMs } from "@/modules/Editor/Manager/SubEditor/mappedElements/utils";

export function Color() {
  const { currentElementToEdit } = useEditorStore(
    (state) => state.editorFunctions
  );

  const [colorPicker, setColorPicker] = useState(
    useGetCurrentStyles("color") || "#000"
  );

  const updateStyles = useUpdateCurrentStyles();

  const debouncedUpdate = useCallback(
    debounce((color: string) => updateStyles({ color }), debounceTimeMs),
    [currentElementToEdit]
  );

  useEffect(() => {
    debouncedUpdate(colorPicker);
  }, [colorPicker]);

  return <ColorPicker color={colorPicker} setColor={setColorPicker} />;
}
