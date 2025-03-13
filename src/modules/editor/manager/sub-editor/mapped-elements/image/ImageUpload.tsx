import { Input } from "@/components/ui/input";

export function ImageUpload() {
  return (
    <div className="flex flex-col gap-2 items-start">
      <label
        htmlFor="image-upload"
        className="text-sm text-zinc-600 font-medium"
      >
        Upload
      </label>
      <Input id="image-upload" type="file" />
    </div>
  );
}
