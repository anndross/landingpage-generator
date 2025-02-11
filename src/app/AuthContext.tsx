"use client";
import { createContext, ReactNode, useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { auth } from "@/config/firebase";
import {
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/navigation";

const AuthContext = createContext<{
  signInByGoogle: () => any;
  signUp: (
    email: string,
    password: string
  ) => Promise<{ result: UserCredential | null; error: unknown | null }> | null;
  signInByCredential: (
    email: string,
    password: string
  ) => Promise<{ result: UserCredential | null; error: unknown | null }> | null;
  logOut: () => Promise<void> | null;
  user: User | null;
}>({
  signInByGoogle: () => null,
  signInByCredential: () => null,
  logOut: () => null,
  signUp: () => null,
  user: null,
});

interface AuthProviderProps {
  children: ReactNode | ReactNode[];
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    let result = null;
    let error = null;

    try {
      result = await createUserWithEmailAndPassword(auth, email, password);
    } catch (e) {
      error = e;
    }

    return { result, error };
  };

  const signInByCredential = async (email: string, password: string) => {
    let result = null;
    let error = null;

    try {
      result = await signInWithEmailAndPassword(auth, email, password);
    } catch (e) {
      error = e;
    }

    console.log({ result, error });
    return { result, error };
  };

  const signInByGoogle = async () => {
    let result = null;
    let error = null;

    try {
      const provider = new GoogleAuthProvider();

      result = await signInWithPopup(auth, provider).then(() => {
        router.push("/editor");
      });
    } catch (e) {
      error = e;
    }

    return { result, error };
  };

  const logOut = () => {
    const cookieStore = window.cookieStore;
    cookieStore.delete("auth_token");

    console.log(cookieStore);

    return signOut(auth);
  };

  useEffect(() => {
    async function getToken() {
      const token = await user?.getIdToken();
      console.log(`token`, token);

      const cookieStore = window.cookieStore;

      if (token?.length) cookieStore.set("auth_token", token);
    }

    getToken();
  }, [user]);

  return (
    <AuthContext.Provider
      value={{ user, signInByGoogle, signInByCredential, logOut, signUp }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
