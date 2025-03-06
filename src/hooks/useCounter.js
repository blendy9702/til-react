import { useState } from "react";

export function useCount(initvalue = 0) {
  const [count, setCount] = useState(initvalue);
  const plus = () => setCount(count + 1);
  const minus = () => setCount(count - 1);
  const reset = () => setCount(initvalue);

  return { count, plus, minus, reset };
}
