'use client';
import React, { FC, useState } from "react";
import { LayoutPreview } from "./LayoutPreview";
import { CodePreview } from "./CodePreview";
import clsx from "clsx";
import richTextJson from './vtex-io-components/rich-text.json'
import imageJson from './vtex-io-components/image.json'


export function Preview() {
  const [showCode, setShowCode] = useState(false)
  const [code, setCode] = useState<any>(null)


  return (
    <div className="flex flex-col justify-between gap-2">
      <div className="flex items-start justify-between">
        <h2>Preview</h2>
        <button onClick={() => setShowCode(!showCode)} className="bg-slate-500 text-white rounded-md px-2 p-1 hover:bg-slate-400 active:bg-slate-500 duration-100">
          {!showCode ? 'CODE' : 'PREVIEW' }
        </button>
      </div>

      <div 
        className={clsx({
          "w-[600px] h-96": true,
          "hidden": !showCode
        })}
      >
        <CodePreview code={code} />
      </div>

      <div 
        className={clsx({
          "w-[600px] h-96": true,
          "hidden": showCode
        })}
      >
        <LayoutPreview code={code} setCode={setCode} />
      </div>
    </div>
  );
};