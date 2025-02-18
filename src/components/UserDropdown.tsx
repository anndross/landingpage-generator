"use client";
import { useAuth } from "@/modules/Auth/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { CiUser } from "react-icons/ci";

export function UserDropdown() {
  const { logOut, user } = useAuth();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <CiUser />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Nome</DropdownMenuLabel>
          <DropdownMenuItem>{user?.displayName}</DropdownMenuItem>
          <DropdownMenuLabel>E-mail</DropdownMenuLabel>
          <DropdownMenuItem>{user?.email}</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              logOut();
              router.push("/login");
            }}
          >
            Sair
          </Button>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
