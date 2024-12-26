# useCallback

- useCallback() : 함수를 리랜더링시 다시 정의하지 않고 보관해둠

## 기본예제

- `컴포넌트는 props 가 전달되면 리랜더링 한다.`
- `props가 변화 없으면 리랜더링 안한다.`

```jsx
import { useCallback, useState } from "react";

const App = () => {
  // 숫자 state
  const [count, setCount] = useState(0);
  // 문자 state
  const [text, setText] = useState("");
  // 숫자 증가 함수를 메모해둠
  // 만약 count가 변하면 리랜더링 됨.
  // 만약 text가 변하면 리랜더링 됨.
  // useCallback을 활용하지 않으면 count, text가 변할 때 함수가 다시 만들어짐
  const add = useCallback(() => {
    console.log("함수가 다시 만들어질까?");
    setCount(prev => prev + 1);
  }, []);
  return (
    <div>
      <h1>부모 컴포넌트</h1>
      <Child add={add} />
      <div>카운팅 : {count}</div>
      <input value={text} onChange={e => setText(e.target.value)} />
    </div>
  );
};

export default App;

function Child({ add }) {
  console.log("자식 컴포넌트 리랜더링");
  return (
    <div>
      자식 컴포넌트
      <button onClick={add}>증가</button>
    </div>
  );
}
```
