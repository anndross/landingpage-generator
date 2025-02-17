import { ElementType, InputHTMLAttributes } from "react";

interface InputWithIconProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: ElementType;
}

export function InputWithIcon({ icon: Icon, ...props }: InputWithIconProps) {
  return (
    <div className="rounded-md flex items-center gap-2 px-2 border border-zinc-300">
      <Icon className="h-6 w-6" />
      <input
        type="number"
        className="w-full text-xs ring-0 border-0 rounded-none shadow-none outline-none focus:ring-0 focus:border-0 focus:outline-none focus:shadow-none"
        {...props}
      />
    </div>
  );
}
