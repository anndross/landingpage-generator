'use client'
import { Header } from "@/components/Header";
import { LateralBar } from "@/components/LateralBar";
import { Preview } from "@/components/Editor/Preview";
import { Section } from "@/components/Sections";
import Context from './context'
import { useState } from "react";

export default function Home() {
  const [previewElements, setPreviewElements] = useState([])

  return (
    <Context.Provider value={{previewElements, setPreviewElements}}>
      <div className="w-full min-h-screen">
        <Header/>
        <main className="w-full h-screen flex items-center justify-left">
          <LateralBar />
          <Preview />
        </main>
      </div>
    </Context.Provider>
  );
}
