import { useState } from "react";

const Sample2 = () => {
  // 다크모드 라이트 모드 관리
  const [isDark, setIsDark] = useState(false);
  // 화면의 CSS Object
  const ThemeCSS = {
    position: "absolute",
    left: "0",
    top: "0",
    width: "100%",
    height: "100vh",
    display: "flex",
    backgroundColor: isDark ? "#000" : "#ffffff",
    transition: "all 0.3s",
  };
  return (
    <div style={ThemeCSS}>
      <button onClick={() => setIsDark(!isDark)}>테마변경</button>
    </div>
  );
};

export default Sample2;
