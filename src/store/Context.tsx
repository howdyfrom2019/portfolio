import React, {createContext, Dispatch, useCallback, useContext, useReducer, useState} from "react";

type ProgressProps = {
  progress: number;
  // onChangeProgress: (progress: number) => void;
}

type Action =
  | { type: "onchange", progress: number }
  | { type: "clear" }

type DispatchType = Dispatch<Action>;

const ZDepthProgressContext = createContext<ProgressProps | null>(null);
const ZDepthProgressDispatchContext = createContext<DispatchType | null>(null);

const reducer = (state: ProgressProps, action: Action): ProgressProps => {
  switch (action.type) {
    case "onchange":
      return {
        ...state,
        progress: action.progress
      };
    case "clear":
      return {
        ...state,
        progress: 0
      };
    default:
      throw new Error("Unhandled Action!");
  }
}

export function ZDepthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { progress: 0 });

  return (
    <ZDepthProgressContext.Provider value={state}>
      <ZDepthProgressDispatchContext.Provider value={dispatch}>
        {children}
      </ZDepthProgressDispatchContext.Provider>
    </ZDepthProgressContext.Provider>
  )
}

export const useZProgressState = () => {
  const state = useContext(ZDepthProgressContext);
  if (!state) throw new Error("Can't find Context");
  return state;
}

export const useZProgressDispatch = () => {
  const dispatch = useContext(ZDepthProgressDispatchContext);
  if (!dispatch) throw new Error("Can't find Dispatch");
  return dispatch;
}