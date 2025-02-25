import { useEffect } from "react";
import { Alert } from "./ui/alert";
import clsx from "clsx";

interface AlertHandleProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

export function AlertHandle({ show, setShow }: AlertHandleProps) {
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 2000);
  }, [show]);

  return (
    <div
      className={clsx({
        "absolute top-4 right-0 translate-x-full max-w-sm w-full": true,
        "translate-x-5": show,
      })}
    >
      <Alert />
    </div>
  );
}
