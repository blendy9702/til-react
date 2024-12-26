# useMemo

- 흔히 `React 를 최적화` 하였습니다.

## 레이아웃 최적화를 했는가?

- `shift Layout`
- css 로 직접 만들거나 npm 을 이용하여 해결

## 리랜더링 최적화를 했는가?

- useMemo() : 변수 관리
- useCallback() : 함수 관리
- React.memo() : 컴포넌트 관리

## Lazy Loading 을 했는가?

## 이미지 최적화를 했는가?

## SEO 최적화를 했는가?

## GA4 적용을 했는가?

## useMemo

- 변수를 보관한다.
- 값, 또는 복잡한 계산의 결과를 재활용할 때
- 같은 값을 계속해서 리랜더링시 `계산하지 않도록 보관`함.
- `가능하면 많이 활용하지 말자`. 오히려 부하가 발생함.

### 기본 이해

- 아래 코드는 숫자를 변경하면 다시 계산.
- 아래 코드는 글자를 변경하면 다시 number 를 계산.
- 즉, 매번 다시 계산. (성능상 이유없이 다시 계산하는 문제)

```jsx
import { useState } from "react";

function App() {
  const [number, setNumber] = useState(0);
  const [text, setText] = useState("");
  const resultFn = () => {
    return number * number;
  };
  return (
    <div>
      <hi>간단한 계산 출력</hi>
      <div>
        <input
          type="number"
          value={number}
          onChange={e => setNumber(parseInt(e.target.value))}
          placeholder="숫자 입력"
        />
        <p>값 : {number}</p>
      </div>
      <div>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="글자 입력"
        />
        <p>글자 : {text}</p>
      </div>
    </div>
  );
}

export default App;
```

- useMemo 를 이용해 연산 조건을 걸어두고 불필요한 연산을 배제해서 성능 개선.

```jsx
import { useMemo, useState } from "react";

function App() {
  const [number, setNumber] = useState(0);
  const [text, setText] = useState("");

  // 값을 메모해두고 해당하는 state만 변경되면 그때 업데이트.
  // 값을 보관하고 리랜더링이 일어나도 다시 값을 계산하지 않음.
  const resultFn = useMemo(() => {
    console.log("다시 계산 : ", number);
    return number * number;
  }, [number]);
  // 여기에서 [number]는 의존성 배열이라고 한다.
  // number 값이 바뀌면 다시 연산을 하라는 의미.
  // 그 외에는 예전 값을 사용함.

  return (
    <div>
      <hi>간단한 계산 출력</hi>
      <div>
        <input
          type="number"
          value={number}
          //   숫자를 입력할 때 값이 변경 : number 값 업데이트
          onChange={e => setNumber(parseInt(e.target.value))}
          placeholder="숫자 입력"
        />
        <p>값 : {resultFn}</p>
      </div>
      <div>
        <input
          type="text"
          value={text}
          //   글자를 입력할 때 number 는 다시 변경되지 않음
          onChange={e => setText(e.target.value)}
          placeholder="글자 입력"
        />
        <p>글자 : {text}</p>
      </div>
    </div>
  );
}

export default App;
```

### 활용 예제

- 단순 연산 외에 배열 처리시 활용
- 배열이 엄청 길때, 배열을 다루는 연산이 복잡하면 실행이 느려짐.
- 배열이 변경될 때 연산되도록 useMemo 활용.

```jsx
import React, { useMemo, useState } from "react";

function App() {
  // 검색어
  const [query, setQuery] = useState("");
  // 검색할 배열요소들 : 실제로는 많은 요소가 있다고 가정.
  const items = ["apple", "banana", "cherry", "date", "elderberry"];

  // query나 items가 변경될 때만 필터링
  const filteredItems = useMemo(() => {
    console.log("Filtering...");
    // filter 는 참인 것만 배열로 모아서 리턴
    // includes 는 글자가 있는지 검사
    return items.filter(item => item.includes(query));
  }, [query, items]);
  // query 즉 검색어와, items 배열에 변화가 일어나면 그때 계산을 다시하라.

  return (
    <div>
      <h1>Filtered List</h1>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search items"
      />
      <ul>
        {filteredItems.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

- 배열요소 검색 예제

```jsx
import { useMemo } from "react";
import { useState } from "react";

function App() {
  // 데이터를 정렬한다.
  const [sortBy, setSortBy] = useState("name");
  // 백엔드에서 받은 회원 목록 데모 데이터
  const data = [
    { id: 1, name: "Bbc", age: 40 },
    { id: 2, name: "Abc", age: 25 },
    { id: 3, name: "Ccc", age: 35 },
  ];
  // 복잡한 연산을 매번 실행하지 않고, sortBy 가 바뀐 경우만 정렬하고 싶다.
  const sortData = useMemo(() => {
    console.log("정렬함", sortBy);
    // 아래 sort 구문은 조건에 따라서 true, false 를 반복하면 순서배치 진행
    // a[sortBy] 는                   a["name"] > b["name"]
    return [...data].sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
  }, [sortBy]);

  return (
    <div>
      <h1>배열의 속성을 이용한 정렬</h1>
      <div>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value={"id"}>ID</option>
          <option value={"name"}>Name</option>
          <option value={"age"}>Age</option>
        </select>
      </div>
      {/* 표 */}
      <table border={1}>
        {/* 테이블 헤더 */}
        <thead>
          {/* 테이블 로우 */}
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
          </tr>
        </thead>
        {/* 테이블 몸체 */}
        <tbody>
          {sortData.map(item => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default App;
```
