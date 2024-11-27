# React JSX 문법

## 1. 컴포넌트 Props

- 컴포넌트의 `property = 값` 으로 작성하면

```jsx
<Box hi="hello" age={10} islogin={false}></Box>
```

- 컴포넌트 내부 {} 객체 리터럴로 전달 됨.

```jsx
function Box(props) {
  console.log("객체", props);
  return <div>Box</div>;
}

export default Box;
```

- 만약 컴포넌트에 내부에 작성된 내용이 있다
- 아래의 `자식` 은 React 에서 `children` 프로퍼티명으로 고정

```jsx
<Box hi="hello" age={10} islogin={false}>
  자식
</Box>
```

- 안좋은 예

```jsx
console.log("객체", props);
console.log("객체", props.hi);
console.log("객체", props.age);
console.log("객체", props.islogin);
console.log("객체", props.children);
console.log("객체", props["hi"]);
```

- `props` 는 꼭 `Destructuring(객체 구조 분해 할당)` 해서 사용하자.

```jsx
function Box({ hi, age, islogin, children }) {
  console.log(hi);
  console.log(age);
  console.log(islogin);
  console.log(children);

  return (
    <div>
      <h1>
        내용입니다.
        {children}
      </h1>
    </div>
  );
}

export default Box;
```

## 2. 컴포넌트 조건문

### 2.1. falshy 한 값은 jsx 에 출력되지 않는다.

- `null, undefined, flase, 0, ""`
- if 문을 jsx 내부에서 사용할 수 없다.

### 2.2. jsx 에 직접 코딩이 가능한 문법

#### 2.2.1 3항연산자를 가장 많이 사용한다.

- `조건 ? 참 값 리턴 : 거짓 값 리턴`
- `로그인 : {islogin ? "로그인중" : "로그아웃중"} <br />`

#### 2.2.2 논리 연산자

- `조건 && 결과`
  : 조건이 `참` 이면 `뒷 내용` 출력
  : 조건이 `거짓` 이면 ``출력
:`나이 : {age < 18 && "미성년자"} <br />`

- `조건 || 결과`
  : 조건이 `참` 이면 `앞 내용` 출력
  : 조건이 `거짓` 이면 `뒷 내용` 출력
  : `인사 : {hi !== "hello" || "인사 좀 합시다"} <br />`

  ### 2.2.3. 옵셔널 체이닝

  - React 에러를 처리해줘서 있어 아주 중요함.
  - `객체?.` 속성명

  ```
  게임레벨 : {info?.level} <br />
  아바타 : {info?.avatar} <br />
  게임포인트 : {info?.point} <br />
  ```

  ### 2.3. `js 로 결과 만든 후` jsx에 출력 하기

  -참조코드

```jsx
<Box
  hi="hello"
  age={10}
  islogin={false}
  say={say}
  info={info}
  status={"208"}
  fetching={"pending"}
></Box>
```

#### 2.3.1. if

```jsx
let message;
let nowStatus = status.charAt(0);
if (nowStatus === "2") {
  message = "자료성공";
} else if (nowStatus === "4") {
  message = "Not Found Page";
} else if (nowStatus === "5") {
  message = "Server ShutDown";
} else {
  message = "no no no";
}
```

```jsx
let response;
if (fetching === "pending") {
  response = (
    <p>
      네트워크가 <b>연결중</b> 입니다.
    </p>
  );
} else if (fetching === "fresh") {
  response = (
    <p>
      네트워크가 <b>새로운 데이터</b> 입니다.
    </p>
  );
} else if (fetching === "stale") {
  response = (
    <p>
      네트워크가 <b>오래된 데이터</b> 입니다.
    </p>
  );
} else {
  response = (
    <p>
      네트워크가 <b>오래된 데이터</b> 입니다.
    </p>
  );
}
```

#### 2.3.2. switch

```jsx
switch (fetching) {
  case "pending":
    response = (
      <p>
        네트워크가 <b>연결중</b> 입니다.
      </p>
    );
    break;
  case "fresh":
    response = (
      <p>
        네트워크가 <b>새로운 데이터</b> 입니다.
      </p>
    );
    break;
  case "stale":
    response = (
      <p>
        네트워크가 <b>오래된 데이터</b> 입니다.
      </p>
    );
    break;
  default:
    response = (
      <p>
        네트워크가 <b>에러</b> 입니다.
      </p>
    );
    break;
}
```

## 3. 컴포넌트 반복문

```jsx
const goods = [
  {
    id: 100,
    cate: "과일",
    goodName: "사과",
    imgUrl:
      "http://tourimage.interpark.com/product/tour/00161/A10/500/A1051015_1_980.jpg",
  },
  {
    id: 99,
    cate: "과일",
    goodName: "사과",
    imgUrl:
      "http://tourimage.interpark.com/product/tour/00161/A10/500/A1051015_1_980.jpg",
  },
  {
    id: 103,
    cate: "전자제품",
    goodName: "노트북",
    imgUrl:
      "http://tourimage.interpark.com/product/tour/00161/A10/500/A1051015_1_980.jpg",
  },
  {
    id: 1004,
    cate: "패션",
    goodName: "바지",
    imgUrl:
      "http://tourimage.interpark.com/product/tour/00161/A10/500/A1051015_1_980.jpg",
  },
];
```

```jsx
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Box fruits={과일} goods={goods} />
  </StrictMode>,
);
```

### 3.1. 반복해서 jsx 에 출력한다면 `map`을 사용하자.

- 최소 조건이므로 반드시 알고 있어야 함

```jsx
import { GoodDetailDiv } from "./styles/components/common/styled-common";

const Box = ({ goods }) => {
  console.log(goods);
  return (
    <div>
      <h1>여기는 레이아웃</h1>
      <div>
        {goods.map(item => {
          return (
            <GoodDetailDiv key={item?.id}>
              <h2>{item?.cate}</h2>
              <h3>{item?.goodName}</h3>
              <div>
                <img src={item?.imgUrl} alt={item?.goodName} />
              </div>
            </GoodDetailDiv>
          );
        })}
      </div>
    </div>
  );
};

export default Box;
```

- 추천
  : 기능과 화면은 분리하도록 하자.

```jsx
import { GoodDetailDiv } from "./styles/components/common/styled-common";

const Box = ({ goods, tickets, tour }) => {
  // 제품을 렌더링 하는 함수
  const renderGoods = datas => {
    const result = datas.map(item => {
      return (
        <GoodDetailDiv key={item?.id}>
          <h2>{item?.cate}</h2>
          <h3>{item?.goodName}</h3>
          <div>
            <img src={item?.imgUrl} alt={item?.goodName} />
          </div>
        </GoodDetailDiv>
      );
    });
    return result;
  };

  return (
    <div>
      <h1>여기는 레이아웃</h1>
      <div>{renderGoods(goods)}</div>
      {/* 상품정보 2 */}
      <div>{renderGoods(tour)}</div>
      {/* 상품정보 3 */}
      <div>{renderGoods(tickets)}</div>
    </div>
  );
};

export default Box;
```

### 3.2. 반복문 `foreach` 고려해 보기

```jsx
// 제품을 렌더링 하는 forEach 함수
const renderGoodsEach = datas => {
  const tempArr = [];
  datas.forEach(item => {
    const tag = (
      <GoodDetailDiv key={item?.id}>
        <h2>{item?.cate}</h2>
        <h3>{item?.goodName}</h3>
        <div>
          <img src={item?.imgUrl} alt={item?.goodName} />
        </div>
      </GoodDetailDiv>
    );
    tempArr.push(tag);
  });
  return tempArr;
};
```

## 4. 컴포넌트 state

- 모든 `컴포넌트는 state 속성`을 가지고 있다.
- 모든 컴포넌트는 가지고 있는 `state 가 바뀌면 화면을 리렌더링` 한다.
- 모든 컴포넌트는 웹브라우저 새로고침하기 전까지 `state 를 유지`한다.

### 4.1. 기준을 세워보자

- 리액트 컴포넌트에서 사용하는 변수는 그냥 `useState()` 로 만들자
- 컴포넌트의 변수를 변경해서 리렌더링이 필요한 경우 `useState()` 사용

### 4.2. State 업데이트 시점문제 해결책

```jsx
const Sample0 = () => {
  console.log("리렌더링");
  // count 를 State 보관하고, count 리랜더링하기
  const [count, setCount] = useState(0);
  //   클릭하면 set 으로 리랜더링 함
  //   연속으로 업데이트는 안됨(비동기라서 함수완료 후 반영)
  const click = () => {
    // setCount(count + 1);
    // setCount(count + 1);
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
  };
  return (
    <div>
      <h1> 현제점수 : {count}</h1>
      <div>
        <button onClick={click}>점수올리기</button>
      </div>
    </div>
  );
};
```

```jsx
import { useState } from "react";

const Sample0 = () => {
  console.log("리렌더링");
  // count 를 State 보관하고, count 리랜더링하기
  const [count, setCount] = useState(0);
  //   클릭하면 set 으로 리랜더링 함
  //   연속으로 업데이트는 안됨(비동기라서 함수완료 후 반영)
  const clickAdd = () => {
    setCount(count + 1);
  };
  const clickMinus = () => {
    if (count <= 0) {
      return;
    }
    setCount(count - 1);
  };
  const clickReset = () => {
    setCount(0);
  };
  return (
    <div>
      <h1> 현제점수 : {count}</h1>
      <div>
        <button onClick={clickAdd}>점수올리기</button>
        <button onClick={clickMinus}>점수내리기</button>
        <button onClick={clickReset}>초기화</button>
      </div>
    </div>
  );
};

export default Sample0;
```

```jsx
import { useState } from "react";

const Sample0 = () => {
  // 사용자가 입력한 정보를 기억하기
  const [memo, setMemo] = useState("");
  return (
    <div>
      <h1>입력내용 : {memo} </h1>
      <div>
        <input
          type="text"
          value={memo}
          onChange={e => setMemo(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Sample0;
```

```jsx
import { useState } from "react";

const Sample0 = () => {
  // 할일 목록
  const [todoList, setTodoList] = useState([]);
  //  지금입력중인 할일
  const [todo, setTodo] = useState("");
  const clickAdd = () => {
    // 목록을 만들어서 업데이트
    setTodoList([...todoList, todo]);
    setTodo("");
  };
  return (
    <div>
      <h1>입력내용 : {todo}</h1>
      <div>
        <input
          type="text"
          value={todo}
          onChange={e => setTodo(e.target.value)}
        />
      </div>
      <div>
        <button onClick={clickAdd}>할일 추가</button>
        {todoList.map((item, index) => {
          return <div key={index}>{item}</div>;
        })}
      </div>
    </div>
  );
};

export default Sample0;
```

```jsx
import { useState } from "react";

const Sample1 = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleClick = () => {
    if (userName === "") {
      setErrorMessage("이름을 입력하세요.");
      return;
    }
    if (userEmail === "") {
      setErrorMessage("이메일을 입력하세요.");
      return;
    }
    if (userPass === "") {
      setErrorMessage("비밀번호를 입력하세요.");
      return;
    }
    console.log("로그인 시도 중");
  };
  return (
    <div>
      <form>
        <input
          type="text"
          placeholder="이름을 입력해요"
          value={userName}
          onChange={e => setUserName(e.target.value)}
        />
        <br />
        <input
          type="email"
          placeholder="이메일을 입력해요"
          value={userEmail}
          onChange={e => setUserEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="비밀번호 입력해요"
          value={userPass}
          onChange={e => setUserPass(e.target.value)}
        />
        <br />
        <button type="button" onClick={handleClick}>
          로그인
        </button>
      </form>
      <div>
        <div style={{ color: "red" }}>Error : {errorMessage}</div>
      </div>
      <div>
        <div>이름: {userName}</div>
        <div>이메일: {userEmail}</div>
        <div>비밀번호: {userPass}</div>
      </div>
    </div>
  );
};

export default Sample1;
```

- formData

```jsx
import { useState } from "react";

const Sample1 = () => {
  // 서버 전송용 데이터 객체 리터럴 관리
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_pass: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  // form 의 태그의 props 를 이용해서 처리한다.
  const handleChange = e => {
    // 여기서 처리한다.
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClick = () => {
    if (formData.user_name === "") {
      setErrorMessage("이름을 입력하세요.");
      return;
    }
    if (formData.user_email === "") {
      setErrorMessage("이메일을 입력하세요.");
      return;
    }
    if (formData.user_pass === "") {
      setErrorMessage("비밀번호를 입력하세요.");
      return;
    }
    console.log("로그인 시도 중입니다.");
  };

  return (
    <div>
      <form>
        <input
          type="text"
          name="user_name"
          placeholder="이름을 입력해요"
          value={formData.user_name}
          onChange={e => handleChange(e)}
        />
        <br />
        <input
          type="email"
          name="user_email"
          placeholder="이메일을 입력해요"
          value={formData.user_email}
          onChange={e => handleChange(e)}
        />
        <br />
        <input
          type="password"
          name="user_pass"
          placeholder="비밀번호 입력해요"
          value={formData.user_pass}
          onChange={e => handleChange(e)}
        />
        <br />
        <button type="button" onClick={handleClick}>
          로그인
        </button>
      </form>
      <div>
        <div style={{ color: "red" }}>Error : {errorMessage}</div>
      </div>
      <div>
        <div>이름: {formData.user_name}</div>
        <div>이메일: {formData.user_email}</div>
        <div>비밀번호: {formData.user_pass}</div>
      </div>
    </div>
  );
};

export default Sample1;
```

- 장바구니 만들기

```jsx
import { useState } from "react";

const Sample2 = () => {
  // 장바구니 관리
  const [cart, setCart] = useState([]);
  // 장바구니 담기 기능
  const addCart = str => {
    setCart([...cart, str]);
  };
  // 장바구니 제거 기능
  const removeCart = _index => {
    // 배열.filter ( item => 조건이 참이면 리턴 )
    const arr = cart.filter((item, index) => _index !== index);
    setCart(arr);
  };
  return (
    <div>
      <h1>상품목록</h1>
      <div>
        <button onClick={() => addCart("사과")}>사과</button>
        <button onClick={() => addCart("바나나")}>바나나</button>
        <button onClick={() => addCart("딸기")}>딸기</button>
        <button onClick={() => addCart("배")}>배</button>
      </div>
      <h2>장바구니</h2>
      <div>
        {cart.length === 0 ? (
          <p>빨리 담어</p>
        ) : (
          <ul>
            {cart.map((item, index) => {
              return (
                <li key={index}>
                  {item} <button onClick={() => removeCart(index)}>제거</button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sample2;
```
