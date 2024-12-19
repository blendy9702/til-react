# Context API

- 용도
  : 웹서비스에 기본적으로 관리할 자료 보관 및 처리
  : 사용자 로그인 정보
  : 테마
  : 장바구니 등

- 특징
  : 개별 컴포넌트의 state 가 아니고, 앱 잔체의 state 이다.
  : Context 로도 충분하지만, 좀 더 복잡한 데이터 처리 라이브러리 많음.
  : Redux(난이도 높음)
  : Recoil(난이도 낮음, 국내 활성화)
  : Zustand(난이도 낮음, 해외 활성화, 국내 활성화 중)

## useState 로 state 관리를 해보자

- useState 는 각각의 컴포넌트가 state 를 관리하는 형식
- Drilling 으로 인한 문제점을 이해해 보자.
- 예제)

```jsx
import { useState } from "react";

const Header = ({ userInfo, setUserInfo }) => {
  return (
    <header>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>로고</p>
        <nav>
          {userInfo.userId === "" ? (
            <div>
              <button
                onClick={() => {
                  setUserInfo({
                    userId: "hong",
                    userName: "gildong",
                    userRole: "MEMBER",
                  });
                }}
              >
                로그인
              </button>
              <button onClick={() => {}}>회원가입</button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => {
                  setUserInfo({
                    userId: "",
                    userName: "",
                    userRole: "GUEST",
                  });
                }}
              >
                로그아웃
              </button>
              <button onClick={() => {}}>{userInfo.userName}님 정보수정</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
const Main = ({ userInfo }) => {
  return (
    <main>
      {userInfo.userId === "" ? (
        <div>로그인을 하셔야 서비스를 이용할 수 있습니다.</div>
      ) : (
        <div>
          <Chracter userInfo={userInfo} />
          <Friend userInfo={userInfo} />
          <Point userInfo={userInfo} />
          <Map userInfo={userInfo} />
          <FAQ userInfo={userInfo} />
        </div>
      )}
    </main>
  );
};
const Footer = ({ userInfo }) => {
  return <footer>하단 {userInfo.userRole}</footer>;
};

const Chracter = ({ userInfo }) => {
  return (
    <div>
      <div>{userInfo.userName}님 캐릭터 변경 서비스</div>
      <div>
        <ChoiceChracter userInfo={userInfo}>
          캐릭터 종류 선택 서비스
        </ChoiceChracter>
      </div>
    </div>
  );
};

const ChoiceChracter = ({ userInfo }) => {
  return <div>{userInfo.userName}님 캐릭터 종류 선택 서비스</div>;
};

const Friend = ({ userInfo }) => {
  return <div>{userInfo.userName}님 친구관리 서비스</div>;
};

const Point = ({ userInfo }) => {
  return <div>{userInfo.userName}님 포인트 구매 서비스</div>;
};

const Map = ({ userInfo }) => {
  return <div>{userInfo.userName}님 주변 지도 안내</div>;
};

const FAQ = ({ userInfo }) => {
  return <div>{userInfo.userName}님 고객센터 FAQ 서비스</div>;
};

function App() {
  // useState 로 로그인한 사용자 정보 관리
  const [userInfo, setUserInfo] = useState({
    userId: "",
    userName: "",
    userRole: "GUEST",
  });
  return (
    <div>
      <Header userInfo={userInfo} setUserInfo={setUserInfo} />
      <Main userInfo={userInfo} setUserInfo={setUserInfo} />
      <Footer userInfo={userInfo} setUserInfo={setUserInfo} />
    </div>
  );
}

export default App;
```

## Context API 활용

### 추천 폴더 구조

- `/src/contexts` 폴더 생설을 권장.
  : context 는 `문맥` 이라는 뜻인데 `일관성` 이라고도 한다.
  : context 는 `프로그램 전체 목표를 이루기 위한 흐름` 정도로 이해하자.

### 추천파일

- `/src/contexts` 파일 생성
  : `UserInfoContext.jsx` 생성

```jsx
import { createContext, useState } from "react";

// 외부에서 context state 를 사용해야 한다!
export const UserInfoContext = createContext();

// context 에 지정한 범위로 접근해서 만들어둔 값, 기능을 위한 공급자(Provider) 생성.
export const UserInfoProvider = ({ children }) => {
  // useState 로 로그인한 사용자 정보 관리
  const [userInfo, setUserInfo] = useState({
    userId: "",
    userName: "",
    userRole: "GUEST",
  });
  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {/* 지역범위 */}
      {children}
    </UserInfoContext.Provider>
  );
};
```

- App.jsx

```jsx
import { useContext } from "react";
import { UserInfoContext, UserInfoProvider } from "./contexts/UserInfoContext";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserInfoContext);
  return (
    <header>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>로고</p>
        <nav>
          {userInfo.userId === "" ? (
            <div>
              <button
                onClick={() => {
                  setUserInfo({
                    userId: "hong",
                    userName: "gildong",
                    userRole: "MEMBER",
                  });
                }}
              >
                로그인
              </button>
              <button onClick={() => {}}>회원가입</button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => {
                  setUserInfo({
                    userId: "",
                    userName: "",
                    userRole: "GUEST",
                  });
                }}
              >
                로그아웃
              </button>
              <button onClick={() => {}}>{userInfo.userName}님 정보수정</button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
const Main = () => {
  const { userInfo } = useContext(UserInfoContext);
  return (
    <main>
      {userInfo.userId === "" ? (
        <div>로그인을 하셔야 서비스를 이용할 수 있습니다.</div>
      ) : (
        <div>
          <Chracter />
          <Friend />
          <Point />
          <Map />
          <FAQ />
        </div>
      )}
    </main>
  );
};
const Footer = () => {
  const { userInfo } = useContext(UserInfoContext);
  return <footer>하단 {userInfo.userRole}</footer>;
};

const Chracter = () => {
  const { userInfo } = useContext(UserInfoContext);
  return (
    <div>
      <div>{userInfo.userName}님 캐릭터 변경 서비스</div>
      <div>
        <ChoiceChracter>캐릭터 종류 선택 서비스</ChoiceChracter>
      </div>
    </div>
  );
};

const ChoiceChracter = () => {
  const { userInfo } = useContext(UserInfoContext);
  return <div>{userInfo.userName}님 캐릭터 종류 선택 서비스</div>;
};

const Friend = () => {
  const { userInfo } = useContext(UserInfoContext);
  return <div>{userInfo.userName}님 친구관리 서비스</div>;
};

const Point = () => {
  const { userInfo } = useContext(UserInfoContext);
  return <div>{userInfo.userName}님 포인트 구매 서비스</div>;
};

const Map = () => {
  const { userInfo } = useContext(UserInfoContext);
  return <div>{userInfo.userName}님 주변 지도 안내</div>;
};

const FAQ = () => {
  const { userInfo } = useContext(UserInfoContext);
  return <div>{userInfo.userName}님 고객센터 FAQ 서비스</div>;
};

function App() {
  return (
    <div>
      <UserInfoProvider>
        <Header />
        <Main />
        <Footer />
      </UserInfoProvider>
    </div>
  );
}

export default App;
```
