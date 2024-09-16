import React, { createContext, Dispatch, useContext, useReducer } from "react";

type ProgressProps = {
  progress: number;
  // onChangeProgress: (progress: number) => void;
};

type Action = { type: "onchange"; progress: number } | { type: "clear" };

type DispatchType = Dispatch<Action>;

const ZDepthProgressContext = createContext<ProgressProps | null>(null);
const ZDepthProgressDispatchContext = createContext<DispatchType | null>(null);

const reducer = (state: ProgressProps, action: Action): ProgressProps => {
  switch (action.type) {
    case "onchange":
      return {
        ...state,
        progress: action.progress,
      };
    case "clear":
      return {
        ...state,
        progress: 0,
      };
    default:
      throw new Error("Unhandled Action!");
  }
};

export function ZDepthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { progress: 0 });

  return (
    <ZDepthProgressContext.Provider value={state}>
      <ZDepthProgressDispatchContext.Provider value={dispatch}>
        {children}
      </ZDepthProgressDispatchContext.Provider>
    </ZDepthProgressContext.Provider>
  );
}

export const useZProgressState = () => {
  const state = useContext(ZDepthProgressContext);
  if (!state) throw new Error("Can't find Context");
  return state;
};

export const useZProgressDispatch = () => {
  const dispatch = useContext(ZDepthProgressDispatchContext);
  if (!dispatch) throw new Error("Can't find Dispatch");
  return dispatch;
};

interface ModalProps {
  isModalOpened?: boolean;
}

type ModalAction = { type: "change"; isOpened: boolean };
type ModalDispatch = Dispatch<ModalAction>;

const ModalContext = createContext<ModalProps | null>(null);
const ModalDispatchContext = createContext<ModalDispatch | null>(null);

const modalReducer = (state: ModalProps, action: ModalAction): ModalProps => {
  switch (action.type) {
    case "change":
      return {
        ...state,
        isModalOpened: action.isOpened,
      };
    default:
      throw new Error("Unhandled Action!");
  }
};

export function ModalStateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(modalReducer, { isModalOpened: false });

  return (
    <ModalContext.Provider value={state}>
      <ModalDispatchContext.Provider value={dispatch}>
        {children}
      </ModalDispatchContext.Provider>
    </ModalContext.Provider>
  );
}

export const useCheckModalOpened = () => {
  const state = useContext(ModalContext);
  if (!state) throw new Error("Can't find state");

  return state;
};

export const useCheckModalOpenedDispatch = () => {
  const dispatch = useContext(ModalDispatchContext);
  if (!dispatch) throw new Error("Can't find dispatch");

  return dispatch;
};
