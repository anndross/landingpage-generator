"use client";
import { ReactSortable } from "react-sortablejs";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { PreviewElement } from "@/components/Preview/context";
import { LuSquareDashed } from "react-icons/lu";
import { GenericElement } from "../GenericElement";

export function Wrapper() {
  return <GenericElement name="Container" icon={LuSquareDashed} />;

  // return (
  //   <ReactSortable
  //     tag={"div"}
  //     group={{
  //       name: "shared",
  //       pull: true,
  //       put: true,
  //     }}
  //     animation={150}
  //     swapThreshold={0.65}
  //     fallbackOnBody
  //     ghostClass="ghost"
  //     className="flex select-none items-start w-full h-52 p-1 px-2 gap-1 border shadow-sm rounded-lg"
  //     list={state}
  //     setList={(newState) => {
  //       setState(newState);

  //       setList((prev) => {
  //         const indexOfWrapper = prev.findIndex((data) => data.id === id);

  //         prev[indexOfWrapper].children = newState;

  //         return prev;
  //       });
  //     }}
  //   >
  //     <div>
  //       {state.map((item, i) => {
  //         return <div key={item.id}>{item.value}</div>;
  //       })}
  //     </div>
  //   </ReactSortable>
  // );
}
