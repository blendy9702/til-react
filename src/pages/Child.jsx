import { memo } from "react";

const Child = () => {
  console.log("Child : 리랜더링");

  return <div>Child</div>;
};

export default memo(Child);
