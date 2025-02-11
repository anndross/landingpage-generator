import { Switch } from "@/components/ui/switch";

interface EditToggleProps {
  state: boolean;
  setState: (bool: boolean) => void;
}

export function EditToggle({ state, setState }: EditToggleProps) {
  return (
    <div className="flex justify-start gap-2">
      <Switch
        checked={state}
        onCheckedChange={() => setState(!state)}
        id="can-edit"
      />

      <label htmlFor="can-edit" className="text-sm text-zinc-500 font-semibold">
        Editar
      </label>
    </div>
  );
}
