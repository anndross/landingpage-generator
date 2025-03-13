"use client";
import { Button } from "@/components/ui/button";
import { Input } from "../../../components/ui/input";
import { useAuth } from "@/modules/auth/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";

export function SignInForm() {
  const { signInByCredential, signInByGoogle } = useAuth();
  const router = useRouter();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const email = (event.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;

    signInByCredential(email, password);

    router.push("/layouts");
  };

  const onLoginByGoogle = async () => {
    await signInByGoogle();
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-1/2 h-full flex flex-col items-center justify-center p-6 gap-6"
    >
      <h2 className="text-3xl font-semibold text-zinc-700">
        Bem vindo de volta!
      </h2>

      <div className="w-full">
        <label
          className="text-zinc-600 font-medium text-sm"
          htmlFor="login-email"
        >
          E-mail
        </label>
        <Input
          className="mt-2 mb-6"
          required
          name="login-email"
          id="login-email"
          type="email"
          placeholder="Digite seu email..."
        />

        <label
          className="text-zinc-600 font-medium text-sm"
          htmlFor="login-password"
        >
          Senha
        </label>
        <Input
          className="mt-2 mb-6"
          required
          name="login-password"
          id="login-password"
          placeholder="Digite sua senha..."
          type="password"
        />
      </div>

      <Button type="submit" className="w-full">
        Entrar
      </Button>
      <Button
        className="w-full flex gap-2"
        variant="outline"
        type="button"
        onClick={() => {
          onLoginByGoogle();
          router.push("/layouts");
        }}
      >
        Entrar com Google <FcGoogle />
      </Button>
    </form>
  );
}
