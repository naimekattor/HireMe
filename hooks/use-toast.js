"use client";

// Inspired by react-hot-toast library
import * as React from "react";

// These imports might be for external UI library components (like shadcn/ui Toast)
// In a pure JS context, if these are truly just types, they will be ignored.
// If they are actual JS modules, they should remain.
// Assuming they are just types for this conversion context.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ToastActionElement, ToastProps } from "@/components/ui/toast"; // Keeping import path, but removing 'type' keyword

const TOAST_LIMIT = 1;
// TOAST_REMOVE_DELAY is set to a very large number, effectively making toasts permanent
// unless dismissed manually. This matches the original TypeScript code's behavior.
const TOAST_REMOVE_DELAY = 1000000;

// Conceptual type for ToasterToast - properties defined by how objects are created/used
// This is not a formal JS type, but clarifies the expected structure.
/*
type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  open?: boolean; // Added for internal state management
  onOpenChange?: (open: boolean) => void; // Added for internal state management
};
*/

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
}; // Removed as const; it's a regular JS object

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

// Conceptual Action types for reducer
/*
type Action =
  | { type: 'ADD_TOAST'; toast: ToasterToast; }
  | { type: 'UPDATE_TOAST'; toast: Partial<ToasterToast>; }
  | { type: 'DISMISS_TOAST'; toastId?: string; }
  | { type: 'REMOVE_TOAST'; toastId?: string; };
*/

// Conceptual State interface for reducer and hook
/*
interface State {
  toasts: ToasterToast[];
}
*/

// toastTimeouts is a Map to store timeouts for auto-removing toasts
// In JS, ReturnType<typeof setTimeout> is simply the number returned by setTimeout.
const toastTimeouts = new Map();

// Adds a toast to a queue to be removed after TOAST_REMOVE_DELAY
const addToRemoveQueue = (toastId) => {
  // Removed string type annotation
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

// Reducer function to manage the state of toasts
export const reducer = (state, action) => {
  // Removed State and Action type annotations
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        // Add new toast to the beginning and limit the number of toasts
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        // Update an existing toast by merging new properties
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      // Side effects for dismissing: add to remove queue
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        // If no specific toastId, dismiss all currently open toasts
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          // Mark toast as not open, or dismiss all if toastId is undefined
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }
    case "REMOVE_TOAST":
      // If no specific toastId, clear all toasts
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      // Remove a specific toast by its ID
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
    default: // Added default case for exhaustive switch
      return state;
  }
};

// Array to store listener functions for state changes
const listeners = []; // Removed Array<(state: State) => void> type annotation

// The in-memory state, accessible globally
let memoryState = { toasts: [] }; // Removed State type annotation

// Dispatches an action to the reducer and notifies all listeners
function dispatch(action) {
  // Removed Action type annotation
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

// Conceptual Toast type, representing a toast without an ID (ID is generated internally)
/*
type Toast = Omit<ToasterToast, 'id'>;
*/

// Function to create and display a toast
function toast({ ...props }) {
  // Removed Toast type annotation
  const id = genId(); // Generate a unique ID for the toast

  // Function to update an existing toast
  const update = (
    props // Removed ToasterToast type annotation
  ) =>
    dispatch({
      type: actionTypes.UPDATE_TOAST,
      toast: { ...props, id },
    });

  // Function to dismiss a specific toast
  const dismiss = () =>
    dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id });

  // Add the new toast to the state
  dispatch({
    type: actionTypes.ADD_TOAST,
    toast: {
      ...props,
      id,
      open: true, // Mark toast as open
      // Callback for when the toast's open state changes (e.g., user closes it)
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  // Return utility functions to interact with this specific toast
  return {
    id: id,
    dismiss,
    update,
  };
}

// React hook to access and manage toast state
function useToast() {
  const [state, setState] = React.useState(memoryState); // Removed State type annotation

  React.useEffect(() => {
    // Add the component's setState function to the listeners array
    listeners.push(setState);
    return () => {
      // Clean up: remove setState function from listeners when component unmounts
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]); // Added state to dependency array to ensure listener is updated if state changes

  return {
    ...state,
    toast, // Expose the toast creation function
    // Expose a general dismiss function for all toasts or a specific one
    dismiss: (toastId) =>
      dispatch({ type: actionTypes.DISMISS_TOAST, toastId }), // Removed string type annotation
  };
}

export { useToast, toast };
