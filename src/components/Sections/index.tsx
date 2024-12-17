'use client';
import React, { FC, useState } from "react";
import { ReactSortable } from "react-sortablejs";

export interface ItemType {
  id: number;
  name: string;
  type: 'text' | 'image'
}

export const Section: FC = () => {
  const [state, setState] = useState<ItemType[]>([
    { id: 1, name: "Texto", type: 'text' },
    { id: 2, name: "Imagem", type: 'image' },
  ]);

  return (
    <div className="flex flex-col justify-between gap-2">
        <h2>Seções</h2>
        <div className="h-96 bg-slate-200 rounded-lg p-4">
            <ReactSortable 
                style={{width: '100%', height: '100%'}}
                group={{
                    name: 'shared',
                    pull: 'clone',
                    put: false
                }} 
                sort={false} 
                dropBubble 
                onSort={(evt) => console.log(evt)} 
                list={state} 
                setList={setState}
                >
                {state.map((item) => (
                    <div key={item.id}>{item.name}</div>
                ))}
            </ReactSortable>
        </div>
    </div>
  );
};