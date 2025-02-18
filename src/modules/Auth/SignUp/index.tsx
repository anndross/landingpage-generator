"use client";
import { Button } from "@/components/ui/button";
import { Input } from "../../../components/ui/input";
import { useAuth } from "@/modules/Auth/AuthContext";

export function SignUpForm() {
  const { signUp } = useAuth();

  return (
    <form className="w-1/2 h-full flex flex-col items-center justify-center p-6 gap-10">
      <h2 className="text-3xl font-semibold text-zinc-700">Cadastre-se!</h2>

      <div>
        <label htmlFor="email">E-mail</label>
        <Input id="email" type="email" placeholder="Digite seu email..." />
        <label htmlFor="password">Senha</label>
        <Input
          id="password"
          placeholder="Digite sua senha..."
          type="password"
        />
      </div>

      <Button
        type="button"
        onClick={() => signUp("andreysoares.dev@gmail.com", "52242914@An")}
      >
        Cadastrar
      </Button>
    </form>
  );
}
