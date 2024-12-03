import { createRoot } from "react-dom/client";
import "./index.css";
import Todo from "./todos/Todo";
import Diary from "./diaries/Diary";
import Member from "./member/Member";

createRoot(document.getElementById("root")).render(
  <>
    <Member />{" "}
  </>,
);
