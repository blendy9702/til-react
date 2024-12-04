import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//  as 는 alias 라는 문법으로 별칭을 지음
import HomePage from "./pages/Index";
import AboutPage from "./pages/about/Index";
import TeamPage from "./pages/about/Team";
import ServicePage from "./pages/service/Index";
import NowPage from "./pages/service/Now";
import BlogPage from "./pages/blog/Index";
import DetailPage from "./pages/blog/Detail";
import BlogListPage from "./pages/blog/List";
import NotFound from "./pages/404";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/about">
          <Route index element={<AboutPage />} />
          <Route path="team" element={<TeamPage />} />
        </Route>

        <Route path="/service">
          <Route index element={<ServicePage />} />
          <Route path="now" element={<NowPage />} />
        </Route>

        <Route path="/blog">
          <Route element={<BlogPage />} />
          <Route path=":id" element={<DetailPage />} />
          <Route path="list?id=1&cate=design" element={<BlogListPage />} />
        </Route>
        <Route
          path="*"
          element={
            <h1>
              <NotFound />
            </h1>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
