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
