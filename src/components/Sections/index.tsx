'use client';
import React, { FC, useState } from "react";
import { ReactSortable } from "react-sortablejs";

interface ItemType {
  id: number;
  name: string;
  data: string
}

export const Section: FC = () => {
  const [state, setState] = useState<ItemType[]>([
    { id: 1, name: "shrek", data: '' },
    { id: 2, name: "fiona", data: '' },
  ]);

  return (
    <div>
        <h2>Seções</h2>
        <div className="h-60 bg-slate-200 rounded-lg p-4">
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