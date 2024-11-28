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
