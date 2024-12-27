# 커스텀 훅(custom hook)

## hook 이란?

- hook은 우리말로 `걸다`, `덩달아서 실행` 정도가 되겠다.
- hook은 영어로 `갈고리`
- 리액트 컴포넌트의 state 와 lifecycle에 따라 같이 실행되는 함수.
- useContext, useState, useEffect, useRef, useMemo, useCallback... 약 200개가 있다.
- 개발자가 리액트 빌트인 hook 처럼 만든 hook 을 커스텀 훅이라고 한다.
- useLocation, useNavigation...
- 나도 hook 을 필요로 한 만큼 만들어 사용할 수 있다.

## hook 유의사항

- 동일한 기능을 여러번 사용하면 함수를 만들어 보자.
- 이 함수가 컴포넌트에 사용되면 hook을 만들어 보자.
- `/src/hooks` 폴더에 모아보자.
- 파일명은 반드시 `use훅명.js`으로 생성해야 리액트 hook 처럼 사용 가능.

## hook 사용 유의사항

- 리액트 훅, 커스텀 훅은 반드시 `컴포넌트 내부에 배치.`
- 리액트 훅, 커스텀 훅은 if문, for문 등 내부사용 불가능
- 예외로 커스텀훅은 컴포넌트가 아닌 곳에도 사용할 수 있다.

## 기본 예제

```jsx
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>카운트 : {count}</h1>
      <button onClick={() => setCount(count + 1)}>증가</button>
    </div>
  );
}

export default App;
```

## 훅으로 수정 예제

- App.jsx

```jsx
import { useCount } from "./hooks/useCounter";

function App() {
  const { count, plus, minus } = useCount(100);
  return (
    <div>
      <h1>카운트 : {count}</h1>
      <button onClick={() => plus()}>증가</button>
      <button onClick={() => minus()}>감소</button>
    </div>
  );
}

export default App;
```

- /src/hooks/useCounter.js

```js
import { useState } from "react";

export function useCount(initvalue = 0) {
  const [count, setCount] = useState(initvalue);
  const plus = () => setCount(count + 1);
  const minus = () => setCount(count - 1);
  const reset = () => setCount(initvalue);

  return { count, plus, minus, reset };
}
```

## 실제 커스텀 훅 생성 과정

- 동일한 기능에 반복 사용은 custom hook을 고민해보자.
- 고민을 정말 많이 해야한다.
- /src/hooks/useAxios.js

```js
import axios from "axios";
import { useEffect, useState } from "react";
// 보통 FE 개발자는 백엔드와 API 통신, 주소, 자료를 전달하고 결과를 받는다.
// get, post, putm delete를 사용한다.
// API 통신을 편리하게 사용할 수 있는 hook을 만들어 API 컨벤션을 제공.

// 일반적 사용을 조사
// const { data, error, loading } = useAxios("주소", "자료", "get");
// const { data, error, loading } = useAxios("주소", "자료", "GET");
// const { data, error, loading } = useAxios("주소", { 자료 }, "post");
// const { data, error, loading } = useAxios("주소", null, "put");
// const { data, error, loading } = useAxios("주소", 1, "delete");
export function useAxios(_url, _payload = null, _method) {
  // api 회신 결과
  const [data, setData] = useState(null);
  // api 회신 오류 결과
  const [error, setError] = useState(null);
  // api 호출 진행
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // 로딩 진행중
    setLoading(true);
    // API 연동 실행
    const fetchAPI = async () => {
      try {
        let response;
        //  대문자 통일
        let method = _method.toUppercase(_method);
        switch (method) {
          case "GET":
            // axios.get("주소?id=1&num=2&cate=과일")
            response = await axios.get(_url);
            break;
          case "POST":
            // axios.post("주소", {객체})
            response = await axios.post(_url, _payload);
            break;
          case "PUT":
            // axios.put("주소", {객체})
            response = await axios.put(_url, _payload);
            break;
          case "DELETE":
            // axios.delete("주소?id=5")
            response = await axios.delete(_url);
            break;
          default:
            throw new Error(`${_method}잘못 보냄.`);
        }
        setData(response);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    // 만들어둔 fetch 실행
    fetchAPI();
    // 로딩 완료
    setLoading(false);
  }, [_url, _payload, _method]);

  return { data, error, loading };
}
```

- /src/useLogin.js

```js
// 로그인에 관련된 코드를 모으고 use 훅들을 사용.
// 일반 함수에는 use훅 사용 불가능해서 커스텀훅 만들어야 함

import axios from "axios";
import { useState } from "react";

export const uselogin = () => {
  // 로그인 상태
  const [isLogin, setIsLogin] = useState(false);
  //   사용자 정보
  const [data, setData] = useState(null);
  // 서버 에러
  const [error, setError] = useState(null);
  // 서버 연결중
  const [loading, setLoading] = useState(false);
  //   로그인 함수
  const login = async (id, pw) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/login", { id: id, pw: pw });
      setData(res.data);
      setIsLogin(true);
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setLoading(false);
  };
  return { data, loading, error, isLogin, login };
};
```

- /src/useComponetnt.js

```js
import { useEffect, useState } from "react";

// 화면의 리사이즈를 체크하는 용도의 customHook
const useComponent = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
};
export default useComponent;
```

## 커스텀 훅 사용

- App.jsx

```jsx
import { useAxios } from "./hooks/useAxios";
import useComponent from "./hooks/useComponent";
import { useCount } from "./hooks/useCount";
import { useLogin } from "./hooks/useLogin";

function App() {
  // 커스텀 훅 사용법
  const { count, add, minus } = useCount(100);
  const { data, error, loading } = useAxios();
  const { data, loading, error, isLogin, login } = useLogin();
  const windowSize = useComponent();

  return (
    <div>
      <h1>카운트 : {count}</h1>
      <button onClick={() => add()}>증가</button>
      <button onClick={() => minus()}>감소</button>
    </div>
  );
}
export default App;
```
