import { useState } from "react";
import Child from "./pages/Child";

const App = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  console.log("App 리랜더링");
  return (
    <div>
      <h2>count : {count}</h2>
      <button onClick={() => setCount(count + 1)}>count 증가</button>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <Child />
    </div>
  );
};

export default App;
