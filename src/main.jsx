import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import IndexPage from "./pages/IndexPage";
import CeoPage from "./pages/CeoPage";
import Pop from "./components/pop";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <IndexPage></IndexPage>
    <Pop></Pop>
    {/* <CeoPage></CeoPage> */}
  </StrictMode>,
);
