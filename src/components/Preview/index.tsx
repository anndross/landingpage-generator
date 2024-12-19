'use client';
import React, { useState } from "react";
import { LayoutPreview } from "./LayoutPreview";
import { CodePreview } from "./CodePreview";
import clsx from "clsx";
import CodeContext from "./context";


export function Preview() {
  const [showCode, setShowCode] = useState(false)
  const [code, setCode] = useState<any>(null)

  return (
    <CodeContext.Provider value={{ code, setCode }}>
      <div className="flex flex-col justify-between gap-2">
        <div className="flex items-start justify-between">
          <h2>Preview</h2>
          <button onClick={() => setShowCode((prev) => !prev)} className="bg-slate-500 text-white rounded-md px-2 p-1 hover:bg-slate-400 active:bg-slate-500 duration-100">
            {!showCode ? 'CODE' : 'PREVIEW' }
          </button>
        </div>

        <div 
          className={clsx({
            "w-[600px] h-96": true,
            "hidden": !showCode
          })}
        >
          <CodePreview />
        </div>

        <div 
          className={clsx({
            "w-[600px] h-96": true,
            "hidden": showCode
          })}
        >
          <LayoutPreview />
        </div>
      </div>
    </CodeContext.Provider>
  );
};