import { UserDropdown } from "./UserDropdown";

export function Header() {
  return (
    <header className="w-full justify-between h-20 flex-shrink-0 shadow-sm flex items-center px-4 border-b border-b-gray-200">
      <h1 className="text-xl font-semibold text-zinc-600">
        Gerador de Landing Page
      </h1>
      <UserDropdown />
    </header>
  );
}
