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
