import { ReactNode } from "react";

export interface WrapperProps {
  childs: any | any[];
}

export function Wrapper({ childs }: WrapperProps) {
  return (
    <div style={{ background: "green" }}>
      {childs.length &&
        childs.map((child: any) => {
          return <h2 key={child.id}>{child.value}</h2>;
        })}
    </div>
  );
}
