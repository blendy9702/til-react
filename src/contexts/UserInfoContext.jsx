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
