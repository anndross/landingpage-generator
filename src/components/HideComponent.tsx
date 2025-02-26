import clsx from "clsx";
import { ComponentProps, ReactNode } from "react";

interface HideComponentProps {
  children: ReactNode | ReactNode[];
  hide: boolean;
  className?: ComponentProps<"div">["className"];
}

export function HideComponent({
  children,
  hide,
  className,
}: HideComponentProps) {
  return (
    <div
      className={clsx({
        [className || ""]: true,
        hidden: hide,
      })}
    >
      {children}
    </div>
  );
}
