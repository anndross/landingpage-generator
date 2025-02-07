import { ReactNode } from "react";
import { Input } from "./input";

export interface RadioWithIconProps {
  children: ReactNode;
  title: string;
  ariaLabel: string;
  /**
   * @description must have the same value as id
   */
  htmlFor: string;
  /**
   * @description must have the same value as htmlFor
   */
  id: string;
  /**
   * @description Will link all radios with the same name
   */
  name: string;
  value?: string;
  required?: boolean;
}

export function RadioWithIcon({
  children,
  title,
  ariaLabel,
  htmlFor,
  id,
  name,
  value,
  required,
}: RadioWithIconProps) {
  return (
    <div>
      <label
        className="has-[+:checked]:bg-primary has-[+:checked]:text-white cursor-pointer hover:bg-slate-50 duration-150 flex items-center justify-center p-3 rounded-sm shadow-md bg-white"
        htmlFor={htmlFor}
        title={title}
        aria-label={ariaLabel}
      >
        {children}
      </label>
      <input
        type="radio"
        value={value || id}
        className="hidden"
        id={id}
        name={name}
        required={required}
      />
    </div>
  );
}
