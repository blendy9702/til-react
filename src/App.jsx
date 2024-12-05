import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
//  as 는 alias 라는 문법으로 별칭을 지음
import HomePage from "./pages/Index";
import AboutPage from "./pages/about/Index";
import TeamPage from "./pages/about/Team";
import ServicePage from "./pages/service/Index";
import NowPage from "./pages/service/Now";
import BlogPage from "./pages/blog/Index";
import DetailPage from "./pages/blog/Detail";
import ListPage from "./pages/blog/List";
import NotFound from "./pages/404";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";
import Layout from "./pages/blog/Layout";

// 목(Mock Data) 데이터
const BlogDatas = [
  { id: 1, title: "블로그 1", cate: "design", content: "디자인 관련글 1" },
  { id: 2, title: "블로그 2", cate: "market", content: "마케팅 관련글" },
  { id: 3, title: "블로그 3", cate: "design", content: "디자인 관련글 2" },
  { id: 4, title: "블로그 4", cate: "idea", content: "아이디어 관련글" },
  { id: 5, title: "블로그 5", cate: "design", content: "디자인 관련글 3" },
];

function App() {
  const [isMember, setIsMember] = useState(true);
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={<HomePage title={"NicelyCompany"} year={2024} />}
          />

          <Route path="/about">
            <Route index element={<AboutPage />} />
            <Route path="team" element={<TeamPage />} />
          </Route>

          <Route path="/service">
            <Route index element={<ServicePage />} />
            <Route path="now" element={<NowPage />} />
          </Route>

          <Route path="/blog" element={<Layout />}>
            <Route index element={<BlogPage data={BlogDatas} />} />
            <Route path=":id" element={<DetailPage />} />
            <Route path="list" element={<ListPage />} />
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
      </main>
      <Footer>
        <p>Copyright 2024 by Lee</p>
        {isMember ? <p>로그인 완료.</p> : <p>로그인이 필요합니다.</p>}
      </Footer>
    </Router>
  );
}

export default App;
