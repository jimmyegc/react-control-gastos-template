import { useState, useCallback } from "react";

/**
 * Hook genérico para manejar estados de tipo booleano (on/off, show/hide, etc.)
 * @param {boolean} initialState - Estado inicial (por defecto: false)
 * @returns {object} { value, toggle, setTrue, setFalse, setValue }
 */
export function useToggle(initialState = false) {
  const [value, setValue] = useState(initialState);

  const toggle = useCallback(() => setValue((prev) => !prev), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);

  return { value, toggle, setTrue, setFalse, setValue };
}
