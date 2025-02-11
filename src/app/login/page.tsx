"use client";
import { SignInForm } from "@/modules/Auth/SignIn";
import { SignUpForm } from "@/modules/Auth/SignUp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import clsx from "clsx";
import { useState } from "react";

export default function Login() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <main className="m-auto h-[80vh] w-[50vw] relative shadow-md rounded-lg border border-zinc-100 flex items-center justify-between">
        <SignInForm />
        <SignUpForm />
        <ToggleLayout />
      </main>
    </div>
  );
}

function ToggleLayout() {
  const [toggleLayout, setToggleLayout] = useState(false);

  return (
    <section
      className={clsx({
        "w-1/2 h-full bg-black absolute right-0 flex flex-col gap-9 justify-center items-center rounded-lg duration-300":
          true,
        "-translate-x-full rounded-r-none": toggleLayout,
        "rounded-l-none": !toggleLayout,
      })}
    >
      <h2 className="text-white text-3xl font-semibold">
        {toggleLayout ? "Já esteve aqui?" : "Novo por aqui?"}
      </h2>
      <Button
        variant="outline"
        onClick={() => setToggleLayout((prev) => !prev)}
      >
        {toggleLayout ? "Entrar" : "Cadastre-se"}
      </Button>
    </section>
  );
}
