// "use client";
// import { BaseProps } from "@/types/base";
// import layoutJSON from "@/shared/editor/data/layout.json";
// import { Element } from "@/types/element";
import { create } from "zustand";
import { LinkProps } from "@/types/link";
import { ContainerProps } from "@/types/container";
import { TextProps } from "@/types/text";
import { ImageProps } from "@/types/image";
import { CSSProperties } from "react";
import { updateCurrentPreviewOnDB } from "@/shared/editor/services/update";
import { debounce } from "lodash";

import { mapStyles } from "@/helpers/mapStyles";
// import { updateCurrentPreviewOnDB } from "@/shared/editor/services/update";
// import { debounce } from "@/helpers/debounce";

// export type Options = {
//   layout: "desktop" | "mobile";
//   code: "VTEX IO";
// };

// export type PreviewType = "layout" | "code";

// export type PreviewOption<T extends PreviewType> = T extends "layout"
//   ? Options["layout"]
//   : T extends "code"
//     ? Options["code"]
//     : never;

// export interface PreviewOptionsI<T extends PreviewType = PreviewType> {
//   type: T;
//   option: PreviewOption<T>;
//   canEdit: boolean;
//   style: boolean;
// }

// export type EditableElement = Element & {
//   type: BaseProps["type"] | "layout";
// };

// export interface EditorContextI {
//   previewElements: Preview;
//   tree: boolean;
//   setTree: (tree: boolean) => void;
//   subEditor: {
//     open: boolean;
//     element: Element | EditorContextI["previewElements"] | null;
//   };
//   setSubEditor: (subEditor: Partial<EditorContextI["subEditor"]>) => void;
//   preview: PreviewOptionsI<"code"> | PreviewOptionsI<"layout">;
//   setPreview: (preview: Partial<EditorContextI["preview"]>) => void;
//   setPreviewElements: (
//     previewElements: Partial<EditorContextI["previewElements"]>
//   ) => void;
//   useEditElement: (data: EditableElement) => void;
// }

// export const useEditor = create<EditorContextI>((set) => ({
//   previewElements: layoutJSON as Preview,
//   setPreviewElements: (previewElements) =>
//     set((state) => ({
//       previewElements: {
//         ...state.previewElements,
//         ...(previewElements as EditorContextI["previewElements"]),
//       },
//     })),
//   tree: false,
//   setTree: (tree) => set(() => ({ tree: tree })),
//   subEditor: {
//     open: false,
//     element: null,
//   },
//   setSubEditor: (subEditor) =>
//     set(() => ({ subEditor: subEditor as EditorContextI["subEditor"] })),
//   preview: {
//     type: "layout",
//     option: "desktop",
//     canEdit: true,
//     style: false,
//   },
//   setPreview: (preview) =>
//     set((state) => ({
//       preview: { ...state.preview, ...(preview as EditorContextI["preview"]) },
//     })),
//   useEditElement: (data) =>
//     set((state: any) => {
//       if (data.type.includes("layout")) {
//         console.log("antes de alterar o layout");
//         debounce(() => {
//           console.log("alterou layout", data.id);
//           updateCurrentPreviewOnDB({
//             ...state.previewElements,
//             ...data,
//           });
//         })();
//         console.log("depois de alterar o layout");

//         return {
//           previewElements: {
//             ...state.previewElements,
//             ...data,
//           },
//         };
//       }

//       const prevClone = { ...state.previewElements };

//       const setDataByPath = (path: number[], newData: Element) => {
//         let current: EditorContextI["previewElements"] | Element = prevClone;

//         for (let i = 0; i < path.length - 1; i++) {
//           current = current?.children[path[i]];
//         }

//         // Obtém o índice final do caminho
//         const lastIndex = path[path.length - 1];

//         if (current?.children && lastIndex !== undefined) {
//           current.children[lastIndex] = newData; // Aqui alteramos diretamente a referência correta
//         }

//         const updateSubEditor = () => {
//           const newSubEditor = { ...state.subEditor, element: newData };

//           state.setSubEditor(newSubEditor);
//         };
//         updateSubEditor();
//       };

//       console.log("antes de alterar o children");
//       debounce(() => {
//         console.log("alterou children", prevClone.id);
//         updateCurrentPreviewOnDB(prevClone);
//       })();
//       console.log("depois de alterar o children");

//       setDataByPath(data?.indexPath || [], data as Element);

//       return { previewElements: prevClone };
//     }),
// }));

// Tipos de configuração
// export type PreviewType = {
//   current: "code" | "layout";
//   layout: { edit: boolean };
//   code: { language: "VTEX IO"; styles: boolean };
// };

// export type ManagerType = {
//   elements: { visible: boolean };
//   subEditor: {
//     visible: boolean;
//     currentElement: EditorType["layout"] | ElementsType | null;
//     breakpoint: "all" | "sm" | "md" | "lg";
//   };
//   tree: { visible: boolean };
// };

// export type EditorType = {
//   settings: {
//     manager: ManagerType;
//     preview: PreviewType;
//   };
//   layout: {
//     id: string;
//     type: "layout";
//     name: string;
//     children: ElementsType[];
//     style: LayoutStyle;
//   };
//   css: string;
//   setCSS: (
//     className: string,
//     styles: Partial<EditorType["layout"]["style"]>
//   ) => void;
//   setSettings: (data: Partial<EditorType["settings"]>) => void;
//   setLayout: (data: Partial<EditorType["layout"] | ElementsType>) => void;
//   setManagerSubEditor: (data: ManagerType["subEditor"]) => void;
//   setManagerTree: (data: ManagerType["tree"]) => void;
//   setManagerElements: (data: ManagerType["elements"]) => void;
//   setPreviewCode: (
//     data: { current: PreviewType["current"] } & PreviewType["code"]
//   ) => void;
//   setPreviewLayout: (
//     data: { current: PreviewType["current"] } & PreviewType["layout"]
//   ) => void;
// };

// Configurações iniciais
// export const INITIAL_SETTINGS: EditorType["settings"] = {
//   manager: {
//     elements: { visible: true },
//     subEditor: { visible: false, currentElement: null, breakpoint: "all" },
//     tree: { visible: false },
//   },
//   preview: {
//     current: "layout",
//     layout: { edit: true },
//     code: { language: "VTEX IO", styles: false },
//   },
// };

// export const useEditor = create<EditorType>((set) => {
//   const debouncedUpdate = debounce(updateCurrentPreviewOnDB, 500);

//   return {
//     settings: INITIAL_SETTINGS,
//     css: "",
//     setCSS: (className, styles) =>
//       set((state) => {
//         const mappedBreakpoints = {
//           all: null,
//           sm: "@media (width <= 375px)",
//           md: "@media (width <= 820px)",
//           lg: "@media (width > 820px)",
//         };

//         const newStyles = (
//           Object.keys(styles) as Array<keyof typeof mappedBreakpoints>
//         ).map((key) => {
//           const breakpoint = key in mappedBreakpoints && mappedBreakpoints[key];

//           if (!breakpoint) {
//             return JSON.stringify(mapStyles(styles[key] || {}));
//           }

//           return `\n${breakpoint} {
//             .${className} ${JSON.stringify(
//               mapStyles(styles[key] || {}),
//               null,
//               2
//             )
//               .replaceAll(`"`, "")
//               .replaceAll(",", ";")}
//           }\n`;
//         });

//         return {
//           css: state.css + newStyles,
//         };
//       }),

//     layout: INITIAL_LAYOUT,
//     setSettings: (data) =>
//       set((state) => ({ settings: { ...state.settings, ...data } })),
//     setManagerSubEditor: (data) =>
//       set((state) => ({
//         settings: {
//           ...state.settings,
//           manager: { ...state.settings.manager, subEditor: data },
//         },
//       })),
//     setManagerTree: (data) =>
//       set((state) => ({
//         settings: {
//           ...state.settings,
//           manager: { ...state.settings.manager, tree: data },
//         },
//       })),
//     setManagerElements: (data) =>
//       set((state) => ({
//         settings: {
//           ...state.settings,
//           manager: { ...state.settings.manager, elements: data },
//         },
//       })),
//     setPreviewCode: (data) =>
//       set((state) => ({
//         settings: {
//           ...state.settings,
//           preview: {
//             ...state.settings.preview,
//             current: data.current,
//             code: data,
//           },
//         },
//       })),
//     setPreviewLayout: (data) =>
//       set((state) => ({
//         settings: {
//           ...state.settings,
//           preview: {
//             ...state.settings.preview,
//             current: data.current,
//             layout: data,
//           },
//         },
//       })),
//     setLayout: (data) => {
//       set((state) => {
//         if ((data as EditorType["layout"]).type === "layout") {
//           const newLayout = {
//             ...state.layout,
//             ...(data as EditorType["layout"]),
//           };
//           debouncedUpdate(newLayout);

//           if (state.settings.manager.subEditor.visible) {
//             state.setManagerSubEditor({
//               ...state.settings.manager.subEditor,
//               currentElement: newLayout,
//             });
//           }

//           return { layout: newLayout };
//         }

//         if (
//           (data as ElementsType)?.indexPath &&
//           (data as ElementsType)?.indexPath.length > 0
//         ) {
//           const updateElement = (
//             children: ElementsType[],
//             path: number[]
//           ): ElementsType[] => {
//             if (path.length === 1) {
//               return children.map((child, index) =>
//                 index === path[0]
//                   ? { ...child, ...(data as ElementsType) }
//                   : child
//               );
//             }

//             return children.map((child, index) =>
//               index === path[0] && "children" in child
//                 ? {
//                     ...child,
//                     children: updateElement(
//                       child.children as ElementsType[],
//                       path.slice(1)
//                     ),
//                   }
//                 : child
//             );
//           };

//           if (state.settings.manager.subEditor.visible) {
//             state.setManagerSubEditor({
//               ...state.settings.manager.subEditor,
//               currentElement: data as ElementsType,
//             });
//           }

//           const updatedChildren = updateElement(
//             state.layout.children,
//             (data as ElementsType)?.indexPath
//           );
//           const updatedLayout = { ...state.layout, children: updatedChildren };

//           debouncedUpdate(updatedLayout);
//           return { layout: updatedLayout };
//         }

//         return state;
//       });
//     },
//   };
// });

// 1. Precisa de um estado para gerenciar os objetos construidos pelo editor;

// 2. Precisa de um estado para gerenciar os estilos dos elementos;
//    1. Precisa gerenciar o estilo do elemento no layout;
//    2. Precisa gerenciar o estilo do elemento convertido;

// 3. Precisa de um estado para gerenciar as funções do editor;
//    1. Ligar/Desligar modo de edição;
//    2. Abir/Fechar árvore;
//    3. Selecionar modo de visualização: (desktop, tablet, mobile)
//    4. Abrir/Fechar barra lateral;
//    5. Selecionar código a ser convertido;
//       1. Selecionar visualização do código;
//       2. Selecionar visualização dos estilos;
//    6. Selecionar o elemento atual a ser editado

export type ElementsOptions = "container" | "text" | "image" | "link";
export type AllElementsOptions =
  | "layout"
  | "container"
  | "text"
  | "image"
  | "link";

export type ElementsType = ImageProps | TextProps | ContainerProps | LinkProps;

export type LayoutStyle = {
  all?: CSSProperties;
  sm?: CSSProperties;
  md?: CSSProperties;
  lg?: CSSProperties;
};

export type EditorStoreLayoutType = {
  id: string;
  type: "layout";
  name: string;
  settings: any;
  ownerId: string;
  children: ElementsType[];
  style: LayoutStyle;
};

export type EditorStoreStylesType = {
  layout?: Record<string, CSSProperties>;
  converted?: Record<string, CSSProperties>;
};

export type Breakpoints = "all" | "lg" | "md" | "sm";

export type CodeSelection = {
  language: "VTEX IO";
  viewStyles: boolean;
};

export type EditorStoreFunctionsType = {
  previewEditMode: boolean;
  currentElementToEdit: EditorStoreLayoutType | ElementsType | null;
  treeOpen: boolean;
  subEditorOpen: boolean;
  breakpoint: Breakpoints;
  viewLayout: boolean;
  sidebarOpen: boolean;
  codeSelection: CodeSelection;
};

const INITIAL_EDITOR_FUNCTIONS: EditorStore["editorFunctions"] = {
  previewEditMode: true,
  currentElementToEdit: null,
  treeOpen: false,
  sidebarOpen: true,
  viewLayout: true,
  subEditorOpen: false,
  breakpoint: "all",
  codeSelection: {
    language: "VTEX IO",
    viewStyles: false,
  },
};

export const INITIAL_LAYOUT: EditorStore["layout"] = {
  id: "",
  type: "layout",
  name: "",
  ownerId: "",
  children: [],
  settings: {},
  style: {
    all: {
      display: "flex",
      width: "100%",
      height: "100%",
      padding: "0",
      margin: "0",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      backgroundColor: "#fff",
      borderRadius: "0px",
      borderWidth: "0px",
      borderStyle: "solid",
      borderColor: "#000",
      boxShadow: "none",
      opacity: "1",
    },
  },
};

export const mappedBreakpoints: { [key in Breakpoints]: string } = {
  all: "@media screen",
  sm: "@media (width <= 375px)",
  md: "@media (width <= 820px)",
  lg: "@media (width > 820px)",
};

export type EditorStore = {
  layout: EditorStoreLayoutType;
  styles: EditorStoreStylesType | null;
  editorFunctions: EditorStoreFunctionsType;
  setLayout: (layout: EditorStoreLayoutType | ElementsType) => void;
  setStyles: (
    className: string,
    styles: Record<string, CSSProperties>,
    type: "layout" | "converted"
  ) => void;
  setEditorFunctions: (fn: Partial<EditorStore["editorFunctions"]>) => void;
};

export const useEditorStore = create<EditorStore>((set) => {
  const debouncedUpdate = debounce(updateCurrentPreviewOnDB, 500);

  return {
    layout: INITIAL_LAYOUT,
    styles: null,
    editorFunctions: INITIAL_EDITOR_FUNCTIONS,
    setLayout: (data) =>
      set((state) => {
        const handleDataWhenIsLayout: () => EditorStore["layout"] = () => {
          const newLayout: EditorStore["layout"] = {
            ...state.layout,
            ...(data as EditorStore["layout"]),
          };

          debouncedUpdate(newLayout);

          if (state.editorFunctions.subEditorOpen) {
            state.setEditorFunctions({
              currentElementToEdit: newLayout,
            });
          }

          return newLayout;
        };

        if (data.type === "layout") {
          return { layout: handleDataWhenIsLayout() };
        }

        const handleDataWhenIsElement: () => EditorStore["layout"] = () => {
          const updateElement = (
            children: ElementsType[],
            path: number[]
          ): ElementsType[] => {
            if (path.length === 1) {
              return children.map((child, index) =>
                index === path[0]
                  ? { ...child, ...(data as ElementsType) }
                  : child
              );
            }

            return children.map((child, index) =>
              index === path[0] && "children" in child
                ? {
                    ...child,
                    children: updateElement(
                      child.children as ElementsType[],
                      path.slice(1)
                    ),
                  }
                : child
            );
          };

          if (state.editorFunctions.subEditorOpen) {
            state.setEditorFunctions({
              currentElementToEdit: data,
            });
          }

          const updatedChildren: ElementsType[] = updateElement(
            state.layout.children,
            (data as ElementsType)?.indexPath
          );

          const updatedLayout: EditorStore["layout"] = {
            ...state.layout,
            children: updatedChildren,
          };

          debouncedUpdate(updatedLayout);
          return updatedLayout;
        };

        if ("indexPath" in data && data.indexPath.length > 0) {
          return { layout: handleDataWhenIsElement() };
        }

        return { layout: state.layout };
      }),
    setStyles: (className, styles, type) =>
      set((state) => {
        return {
          styles: {
            ...state?.styles,
            [type]: {
              ...(state?.styles?.[type]
                ? state?.styles?.[type][
                    mappedBreakpoints[state.editorFunctions.breakpoint]
                  ]
                : {}),
              [mappedBreakpoints[state.editorFunctions.breakpoint]]: {
                ...state?.styles?.[type]?.[state.editorFunctions.breakpoint],
                [`.${className}`]: {
                  ...styles,
                },
              },
            },
          },
        };
      }),
    setEditorFunctions: (data) =>
      set((state) => ({
        editorFunctions: { ...state.editorFunctions, ...data },
      })),
  };
});
