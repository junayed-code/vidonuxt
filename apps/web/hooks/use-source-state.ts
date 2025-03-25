import { useReducer } from "react";

type SourceState = {
  source: string;
  error: string | null;
  touched: boolean;
};

export type Action =
  | { type: "update/source/without-error"; payload: string }
  | { type: "update/touched/true" }
  | {
      type: "update/source/with-error";
      payload: { value: string; error: string };
    };

const reducer = (state: SourceState, action: Action) => {
  switch (action.type) {
    case "update/source/without-error":
      return { ...state, source: action.payload, error: null };
    case "update/source/with-error": {
      const { value, error } = action.payload;
      return { ...state, source: value, error };
    }
    case "update/touched/true":
      return state.touched ? state : { ...state, touched: true };
    default:
      throw new Error("Invalid action type");
  }
};

const initialState: SourceState = {
  source: "",
  error: null,
  touched: false,
};

export function useSourceState() {
  return useReducer(reducer, initialState);
}
