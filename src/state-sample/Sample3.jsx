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
