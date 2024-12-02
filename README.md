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

- 여기서부터 연습

```jsx
import styled from "@emotion/styled";
import { useState } from "react";

const ModalWinDiv = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

const Sample3 = () => {
  const [isOpen, setIsOpen] = useState(false);

  const 보이기 = () => {
    setIsOpen(true);
  };

  const 숨기기 = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={보이기}>보기</button>

      {/* {isOpen ? (
        <ModalWinDiv>
          <button onClick={숨기기}>보이지마</button>
        </ModalWinDiv>
      ) : null} */}

      {isOpen && (
        <ModalWinDiv>
          <button onClick={숨기기}>보이지마</button>
        </ModalWinDiv>
      )}
    </div>
  );
};

export default Sample3;
```

```jsx
import { useState } from "react";

const Sample4 = () => {
  const [Like, setLike] = useState(0);
  const [isUnLike, setIsUnLike] = useState(0);
  const clickAdd = () => {
    setLike(Like + 1);
  };
  const clickMinus = () => {
    setIsUnLike(isUnLike + 1);
  };
  return (
    <div>
      <h2>현재 좋아요 수 : {Like}</h2>
      <h2>현재 싫어요 수 : {isUnLike}</h2>
      <button onClick={clickAdd}>좋아요</button>
      <button onClick={clickMinus}>싫어요</button>
    </div>
  );
};

export default Sample4;
```

```jsx
import styled from "@emotion/styled";
import { useState } from "react";

const ColorDiv = styled.div`
  background-color: ${({ bg }) => bg || "red"};
`;

const Sample5 = () => {
  const [bgColor, setBgColor] = useState("green");
  return (
    <div>
      <ColorDiv bg={bgColor}>색상이 바뀌어요.</ColorDiv>
      <button onClick={() => setBgColor("red")}>빨강</button>
      <button onClick={() => setBgColor("yellow")}>노랑</button>
      <button onClick={() => setBgColor("blue")}>파랑</button>
      <button onClick={() => setBgColor("green")}>리셋</button>
    </div>
  );
};

export default Sample5;
```

## 5. 이벤트 처리

- 가장 흔하게 이벤트를 사용하는 곳이 form 태그.

### 5.1. 회원가입 폼 만들기

```jsx
const EventSample1 = () => {
  return (
    <div>
      <h1>회원가입</h1>
      <form>
        {/* 숨긴 쿼리스트링 */}
        <input type="hidden" name="hidden" value="1" />
        {/* 회원가입 기본정보 입력영역 */}
        <fieldset>
          <legend>기본정보</legend>
          <div>
            <label htmlFor="userId">아이디</label>
            <input
              type="text"
              name="userid"
              id="userId"
              className="userId"
              placeholder="아이디를 입력하세요."
              maxLength={8}
              minLength={4}
            />
            <button type="button">아이디 중복검사</button>
          </div>

          <div>
            <label htmlFor="userEmali">이메일</label>
            <input
              type="email"
              name="useremail"
              id="userEmail"
              placeholder="이메일을 입력하세요."
            />
          </div>

          <div>
            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              name="userpassword"
              id="password"
              placeholder="비밀번호를 입력하세요."
              maxLength={16}
              minLength={8}
            />
          </div>

          <div>
            <label htmlFor="userPasswordConfirm">비밀번호 확인</label>
            <input
              type="password"
              name="userpasswardconfirm"
              id="userPasswordConfirm"
              placeholder="비밀번호 확인을 입력하세요."
              maxLength={16}
              minLength={8}
            />
          </div>
        </fieldset>
        {/* 회원가입 부가정보 입력영역 */}
        <fieldset>
          <legend>부가정보</legend>
          <div>
            <label htmlFor="age">나이</label>
            <input type="number" name="age" id="age" defaultValue={0} />
          </div>
          <div>
            <label>성별</label>
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              defaultChecked
            />
            <label htmlFor="male">남성</label>
            <input type="radio" name="gender" id="female" value="female" />
            <label htmlFor="female">여성</label>
            <input type="radio" name="gender" id="etc" value="etc" />
            <label htmlFor="etc">기타</label>
            {/* name="gender" 를 넣었는데 하나만 선택이 된다? */}
          </div>
          <div>
            <label htmlFor="area">지역</label>
            <select name="area" id="area" defaultValue="daegu">
              <option value="">전체</option>
              <option value="daegu">대구</option>
              <option value="busan">부산</option>
              <option value="gwangju">광주</option>
              <option value="jejus">제주</option>
            </select>
          </div>
          <div>
            <label htmlFor="birthday">생일</label>
            <input
              type="date"
              name="birthday"
              id="birthday"
              defaultValue="2024-11-28"
            />
          </div>
          <div>
            <label htmlFor="soge">자기소개</label>
            <textarea
              name="soge"
              id="soge"
              rows={4}
              cols={50}
              style={{ resize: "vertical" }}
            ></textarea>
          </div>
          <div>
            <label htmlFor="pic">이미지</label>
            <input type="file" name="pic" id="pic" accept="image/png" />
          </div>
          <div>
            <label htmlFor="doc">문서</label>
            <input type="file" name="doc" htmlFor="doc" multiple />
          </div>
          <div>
            <label>취미</label>
            <input
              type="checkbox"
              value="골프"
              name="hobby"
              id="ho1"
              defaultChecked
            />
            <label htmlFor="ho1">골프</label>
            <input type="checkbox" value="운동" name="hobby" id="ho2" />
            <label htmlFor="ho2">운동</label>
            <input type="checkbox" value="공부" name="hobby" id="ho3" />
            <label htmlFor="ho3">공부</label>
            <input type="checkbox" value="요리" name="hobby" id="ho4" />
            <label htmlFor="ho4">요리</label>
          </div>
        </fieldset>
        <div>
          <button type="reset">다시작성</button>
          <button type="submit">회원가입</button>
        </div>
      </form>
    </div>
  );
};

export default EventSample1;
```

### 5.2. 이벤트 만들고 처리하기

- 리액트에서 제공되는 규칙은 `카멜케이스`다.
- 리액트에서 제공되는 규칙은 `on이벤트={하고싶은 일}`다.
- `onClick`
- `onChange`
- `onSubmit`
- `onKeyDown`
- `onKeyUp`
- `onMouseEnter`
- `onMouseLeave`

```jsx
import { useState } from "react";

const EventSample1 = () => {
  const initData = {
    now: 1,
    userid: "",
    userpass: "",
    userpassconfirm: "",
    age: 0,
    gender: "male",
    area: "daegu",
    birthday: "2024-11-28",
    soge: "",
    pic: null,
    doc: null,
    hobby: ["골프"],
  };
  const [formData, setFormData] = useState(initData);

  const [idCheck, setIdCheck] = useState(false);

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  const handleClick = event => {};
  const handleIdCheck = () => {};
  const handleSubmit = event => {
    // 기본 동작 즉, 웹브라우저로 action 하려는 것 막고 유효성 검사
    event.preventDefault();
  };
  const handleKeyDown = event => {
    if (event.key === "Enter") {
      if (formData.userpass !== formData.userpassconfirm) {
        alert("비밀번호가 서로 다릅니다.");
        setFormData({ ...formData, [event.target.name]: "" });
      }
    }
  };

  return (
    <div>
      <h1>회원가입</h1>
      <form onSubmit={event => handleSubmit(event)}>
        {/* 숨긴 쿼리스트링 */}
        <input type="hidden" name="now" value={formData.now} />
        {/* 회원가입 기본정보 입력영역 */}
        <fieldset>
          <legend>기본정보</legend>
          <div>
            <label htmlFor="userId">아이디</label>
            <input
              type="text"
              name="userid"
              value={formData.userid}
              id="userId"
              className="userId"
              placeholder="아이디를 입력하세요."
              maxLength={8}
              minLength={4}
              onChange={event => handleChange(event)}
            />
            <button
              type="button"
              onClick={() => {
                alert(
                  `${formData.userid} 를 들고 백엔드 갔다왔더니 중복 아니랍니다.`,
                );

                setIdCheck(true);
              }}
            >
              아이디 중복검사
            </button>
          </div>
          <div>
            <label htmlFor="userEmail">이메일</label>
            <input
              type="email"
              name="useremail"
              value={formData.useremail}
              id="userEmail"
              placeholder="이메일을 입력하세요."
              onChange={event => handleChange(event)}
            />
          </div>
          <div>
            <label htmlFor="userPass">비밀번호</label>
            <input
              type="password"
              name="userpass"
              value={formData.userpass}
              id="userPass"
              placeholder="비밀번호를 입력하세요."
              maxLength={16}
              minLength={8}
              onChange={event => handleChange(event)}
            />
          </div>
          <div>
            <label htmlFor="userPassConfirm">비밀번호확인</label>
            <input
              type="password"
              name="userpassconfirm"
              value={formData.userpassconfirm}
              id="userPassConfirm"
              placeholder="비밀번호 확인을 입력하세요."
              maxLength={16}
              minLength={8}
              onChange={event => handleChange(event)}
              onKeyDown={event => handleKeyDown(event)}
            />
          </div>
        </fieldset>
        {/* 회원가입 부가정보 입력영역 */}
        <fieldset>
          <legend htmlFor="age">부가정보</legend>
          <div>
            <label>나이</label>
            <input
              type="number"
              name="age"
              id="age"
              value={formData.age}
              onChange={event => handleChange(event)}
            />
          </div>
          <div>
            <label>성별</label>
            <input
              type="radio"
              name="gender"
              id="male"
              value="male"
              // defaultChecked
              checked={formData.gender === "male"}
              onChange={event => handleChange(event)}
            />
            <label htmlFor="male">남성</label>
            <input
              type="radio"
              name="gender"
              id="femail"
              value="femail"
              checked={formData.gender === "femail"}
              onChange={event => handleChange(event)}
            />
            <label htmlFor="femail">여성</label>
            <input
              type="radio"
              name="gender"
              id="etc"
              value="etc"
              checked={formData.gender === "etc"}
              onChange={event => handleChange(event)}
            />
            <label htmlFor="etc">기타</label>
          </div>

          <div>
            <label htmlFor="area">지역</label>
            <select
              name="area"
              id="area"
              value={formData.area}
              //defaultValue={formData.area}
              onChange={event => handleChange(event)}
            >
              <option value="">전체</option>
              <option value="daegu">대구</option>
              <option value="busan">부산</option>
              <option value="gwangju">광주</option>
              <option value="jejus">제주</option>
            </select>
          </div>

          <div>
            <label htmlFor="birthday">생일</label>
            <input
              type="date"
              name="birthday"
              value={formData.birthday}
              id="birthday"
              //defaultValue={formData.birthday}
              onChange={event => handleChange(event)}
            />
          </div>

          <div>
            <label htmlFor="sogo">자기소개</label>
            <textarea
              name="soge"
              id="soge"
              value={formData.soge}
              rows={4}
              cols={50}
              style={{ resize: "vertical" }}
              onChange={event => handleChange(event)}
            ></textarea>
          </div>
          <div>
            <label htmlFor="pic">이미지</label>
            <input
              type="file"
              name="pic"
              id="pic"
              value={formData.pic}
              accept="image/png, image/jpeg"
              onChange={event => handleChange(event)}
            />
          </div>
          <div>
            <label htmlFor="doc">문서</label>
            <input
              type="file"
              name="doc"
              value={formData.doc}
              id="doc"
              multiple
              onChange={event => handleChange(event)}
            />
          </div>

          <div>
            <label>취미</label>
            <input
              type="checkbox"
              value="골프"
              name="hobby"
              id="ho1"
              defaultChecked
            />
            <label htmlFor="ho1">골프</label>
            <input type="checkbox" value="운동" name="hobby" id="ho2" />
            <label htmlFor="ho2">운동</label>
            <input type="checkbox" value="공부" name="hobby" id="ho3" />
            <label htmlFor="ho3">공부</label>
            <input type="checkbox" value="요리" name="hobby" id="ho4" />
            <label htmlFor="ho4">요리</label>
          </div>
        </fieldset>
        <div>
          <button
            type="button"
            onClick={() => {
              setFormData(initData);
            }}
          >
            다시작성
          </button>
          <button type="submit">회원가입</button>
        </div>
      </form>
    </div>
  );
};

export default EventSample1;
```

- 타자 게임

```jsx
import { useState } from "react";

const EventSample2 = () => {
  const testWord = "안녕하세요.";
  const [userWord, setUserWord] = useState("");
  const [feedback, setFeedback] = useState("🎆시작하시요.");
  const [gameTime, setGameTime] = useState(0);
  const [start, setStart] = useState(false);
  const [timeId, setTimeId] = useState(null);

  const gameStart = () => {
    if (start === false) {
      // 타이머 만들자.
      setStart(true);
      const 식별자 = setInterval(() => {
        // 아래는 상태값 gameTime 을 참조한다.
        // 아래는 실행될 당시의 값이다.
        // 업데이트 하고 있는데 다시 업데이트를 하면 오류다.
        // 그러나 오류가 나도 띄워주지 않고 묻어버린다.
        // 즉시 반영이 안되는 경우가 존재한다.
        // 이유는 언제 업데이트가 되었는지를 보장할 수 없다.
        // setGameTime(gameTime + 1);

        // 아래 방식은 state 를 업데이트 할 때
        // 값이 아니라 `업데이트 함수` 를 전달하는 것.
        // 아래는 함수라서 항상 실행을 보장합니다.
        // 아래의 문장을 한글로 고쳐보면
        // setGameTime(보관값 => { return 보관값 + 1} );
        setGameTime(prev => prev + 1);
      }, 1000);
      setTimeId(식별자);
    }
  };
  // gameStart();

  const gameIng = event => {
    setUserWord(event.target.value);
    // 비교해서 업데이트
    if (event.target.value === testWord) {
      setFeedback("잘~~ 작성하고 계시네요(●'◡'●)");
    } else {
      setFeedback("오타에요(┬┬﹏┬┬)");
    }
  };
  const gameResult = event => {
    if (event.key === "Enter") {
      alert("고생했어요.");
      // 타이머 지우기
      clearInterval(timeId);
    }
  };
  return (
    <div>
      <h1>키보드 타이핑 연습 웹 앱서비스</h1>
      <p>
        다음문장을 작성하시오: <b>{testWord}</b>
      </p>
      <button onClick={() => gameStart()}>게임시작</button>
      <div>{gameTime}</div>
      <div>{feedback}</div>
      <div>
        <label htmlFor="userinput">입력글</label>
        <input
          value={userWord}
          id="userinput"
          onChange={event => {
            gameIng(event);
          }}
          onKeyDown={event => gameResult(event)}
        />
      </div>
    </div>
  );
};

export default EventSample2;
```

## 6. useEffect

### 6.1. 특징

- 리랜더링에서 제외됨.
- 백엔드 API 호출시 좋은 자리 : 자료를 만들고 화면을 보여주는 흐름
- 컴포넌트 최초 데이터 셋팅 : state 값에 기본값 넣기

### 6.2. 최초 컴포넌트 보일때 용도

- 최초 화면에 컴포넌트가 보이면 딱 한번 실행(함수, setState 한번만...)
- 최초 화면에 컴포넌트가 보일때 `백엔드 데이터 가지고 올때` 딱 한번 실행
- window.addEventListener("resize", function(){})
- document.querySelector("") 등등
- 아래는 `딱! 한번만`, 즉 보일 때 `실행`한다.

```jsx
useEffect (함수, state 들의 의존성 배열)
useEffect ( () => { 하고싶은일 }, [] )
```

### 6.3. 컴포넌트의 `state 가 변하는 것`을 `체크`하고 싶을

- 리랜더링 될 때
- 화면의 변화가 있을 때 마다 덩달아 해야할일 지정할 때

```jsx
useEffect(()=>{ 감시하다가 할일 },[state1, state2, state3..])
```

### 6.4. 컴포넌트가 화면에서 사라질 때

- 마지막 처리하고자 하는 내용 실행

```jsx
useEffect( ()=>{
  // 할일...
  // 할일...
  // 클린업 함수
  return () => {
    마지막 할일
    마지막 할일
  }
}, [state1, state2..])
```

### 6.5. 아래 코드를 이해해 보자.

```jsx
useEffect(() => {
  window.addEventListener("resize", () => console.log("lol"));
  window.addEventListener("mousemove", () => console.log("lol"));

  return () => {
    window.addEventListener("resize", () => console.log("lol"));
    window.addEventListener("mousemove", () => console.log("lol"));
  };
}, []);
```
