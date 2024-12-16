'use client';
import React, { FC, useState } from "react";
import { ReactSortable } from "react-sortablejs";

interface ItemType {
  id: number;
  name: string;
}

export const Preview: FC = (props) => {
  const [state, setState] = useState<ItemType[]>([
  ]);

  console.log(state)

  return (
    <div>
        <h2>Preview</h2>
        <ReactSortable 
            className="w-60 h-60 bg-slate-200 rounded-lg p-4"
            group={{
                name: 'shared',
                pull: true,
                put: true
            }} 
            list={state} 
            setList={setState}
        >
            {state.map((item) => (
                <div key={item.id}>{item.name}</div>
            ))}
        </ReactSortable>
    </div>
  );
};