import { ChangeEvent, useContext, useEffect, useState } from "react";
import CodeContext from "../context";
import { updateFinalComponent } from "../utils/updateFinalComponent";

export function EditableImage() {
  const [outputSrc, setOutputSrc] = useState<string | undefined>(undefined);
  const { code, setCode } = useContext(CodeContext);

  function updateContent(content: string) {
    const newCode = updateFinalComponent("image", content, code);
    setCode((prev: any) => ({ ...prev, ...newCode }));
  }

  useEffect(() => {
    updateContent(outputSrc || "");
  }, []);

  function handleOutput(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return;

    const src = URL.createObjectURL(event.target.files[0]);

    updateContent(src || "");
    setOutputSrc(src);
  }

  return (
    <>
      <input type="file" onChange={handleOutput} />
      <img id="output" src={outputSrc} />
    </>
  );
}
