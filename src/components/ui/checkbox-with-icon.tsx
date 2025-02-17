"use client";
import { ChangeEventHandler, ReactNode } from "react";

export interface CheckboxWithIconProps {
  children: ReactNode;
  title: string;
  ariaLabel: string;
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
  checked?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
}

export function CheckboxWithIcon({
  children,
  title,
  ariaLabel,
  id,
  name,
  checked = false,
  onChange = () => {},
  value,
  required,
}: CheckboxWithIconProps) {
  return (
    <div>
      <label
        className={`has-[+:checked]:bg-primary has-[+:checked]:text-white cursor-pointer hover:bg-slate-50 duration-150 border border-zinc-200 flex items-center justify-center p-2 rounded-sm shadow-sm bg-white`}
        htmlFor={id}
        title={title}
        aria-label={ariaLabel}
      >
        {children}
      </label>
      <input
        checked={checked}
        onChange={(event) => {
          onChange(event);
        }}
        type="checkbox"
        value={value || id}
        className="hidden"
        id={id}
        name={name}
        required={required}
      />
    </div>
  );
}
