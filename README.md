# 최적화

- 개발시에는 최적화 하지 않습니다.
- 이유는 최적화로 인해서 개발의 속도가 오히려 늦어집니다.
- 개발 이후 시간을 가지고 최적화를 고민합니다.

## 종류

- useMemo : 변수 저장해 두기
- useCallback: 함수 저장해 두고 새로 랜더링 될때 만들지 않기
- React.memo : 컴포넌트에서 props가 바뀌지 않으면 새로 랜더링하지 않기

## useMemo

```jsx
import { useState } from "react";

const App = () => {
  console.log("App : 리랜더링");
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(1);

  // 값을 2배로
  const now = num * 2;
  console.log("now : ", now);

  return (
    <div>
      <h2>count 값 : {count}</h2>
      <h2>num 값 : {num}</h2>
      <h2>now 는 2배값 : {now}</h2>
      <button onClick={() => setNum(num + 1)}>num 증가 </button>
      <button onClick={() => setCount(count + 1)}>count 증가</button>
    </div>
  );
};
export default App;
```

- 문제점
  - `count state` 변경시
  - now 값이 상관없는데 매번 다시 `계산`됨
- 원하는 것
  - `num state` 가 변할때만
  - now 가 `계산`되길 원한다.

```jsx
import { useMemo } from "react";
import { useState } from "react";

const App = () => {
  console.log("App : 리랜더링");
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(1);

  // 값을 2배로
  // const now = num * 2;
  const now = useMemo(() => {
    console.log("now 계산");
    return num * 2;
  }, [num]);

  return (
    <div>
      <h2>count 값 : {count}</h2>
      <h2>num 값 : {num}</h2>
      <h2>now 는 2배값 : {now}</h2>
      <button onClick={() => setNum(num + 1)}>num 증가 </button>
      <button onClick={() => setCount(count + 1)}>count 증가</button>
    </div>
  );
};
export default App;
```

## useCallback

```jsx
import { useState } from "react";

const App = () => {
  console.log("App : 리랜더링");
  const [count, setCount] = useState(0);

  // 새로 랜더링 되면 다시 만들어짐.
  console.log("add 함수 생성");
  const add = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h2>Count: {count}</h2>
      <button onClick={add}>함수실행</button>
    </div>
  );
};
export default App;
```

- 문제점
  - `count state` 가 변하면
  - App 이 `리랜더링` 되면
  - `add 함수가 매번 다시` 만들어짐.
  - 큰 문제는 없지만 리소스 낭비
- 해결
  - useCallback 처리

```jsx
import { useCallback } from "react";
import { useState } from "react";
import Child from "./pages/Child";

const App = () => {
  console.log("App : 리랜더링");
  const [count, setCount] = useState(0);

  // 검증을 위한 state : state 가 변하면 리랜더링함.
  const [go, setGo] = useState(false);

  // 함수 정의를 저장해두자
  // count 가 변하면 함수가 다시 정의되어서 재 실행한다.
  const add = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return (
    <div>
      <h2>Count: {count}</h2>
      <Child add={add} />
      <button onClick={add}>add 함수에 의해 count state 갱신 실행</button>
      <button onClick={() => setGo(!go)}>go state 갱신</button>
    </div>
  );
};
export default App;
```

- /src/pages/Child.jsx 생성

```jsx
import { memo } from "react";

const Child = ({ add }) => {
  console.log("Child : 리랜더링");
  return (
    <div>
      <h3>===Child===</h3>
      <button onClick={add}>자식이 함수실행</button>
    </div>
  );
};
export default memo(Child);
```

- 리랜더링의 대상 state 를 별도로 지정해서 처리한다.

## React.memo

- 불필요한 리랜더링을 막아준다.
- 컴포넌트가 변하면 자식 컴포넌트도 같이 변한다.
- 자식에게 props 로 state 나 state 를 업데이트하는 함수를 전달하면 갱신
- 그외에는 새로 자식들이 리랜더링이 되지 않는다.

### props 로 state 나 함수를 전달 받을 때만 리랜더링하기

```jsx
import { useState } from "react";
import Child from "./pages/Child";

const App = () => {
  console.log("App : 리랜더링");
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");
  return (
    <div>
      <h1>Count : {count}</h1>
      <button onClick={() => setCount(count + 1)}>count 증가</button>
      <input type="text" value={text} onChange={e => setText(e.target.value)} />
      <Child count={count} setCount={setCount} />
    </div>
  );
};
export default App;
```

```jsx
import { memo } from "react";

const Child = ({ count, setCount }) => {
  console.log("Child : 리랜더링", count, setCount);
  return <div>Child</div>;
};
export default memo(Child);
```
