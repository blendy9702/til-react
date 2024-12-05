import { useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";

const Footer = lazy(() => import("./components/Footer"));
const Header = lazy(() => import("./components/Header"));
const NotFound = lazy(() => import("./pages/404"));
const HomePage = lazy(() => import("./pages/Index"));
const AboutPage = lazy(() => import("./pages/about/Index"));
const TeamPage = lazy(() => import("./pages/about/Team"));
const ServicePage = lazy(() => import("./pages/service/Index"));
const NowPage = lazy(() => import("./pages/service/Now"));
const Layout = lazy(() => import("./pages/blog/Layout"));
const BlogPage = lazy(() => import("./pages/blog/Index"));
const DetailPage = lazy(() => import("./pages/blog/Detail"));
const ListPage = lazy(() => import("./pages/blog/List"));

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
          {/* 로딩창 구현.. */}
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <HomePage title={"NicelyCompany"} year={2024} />
              </Suspense>
            }
          ></Route>

          <Route path="/about">
            <Route
              index
              element={
                <Suspense fallback={<Loading />}>
                  <AboutPage />
                </Suspense>
              }
            />
            <Route
              path="team"
              element={
                <Suspense fallback={<Loading />}>
                  <TeamPage />
                </Suspense>
              }
            />
          </Route>

          <Route path="/service">
            <Route
              index
              element={
                <Suspense fallback={<Loading />}>
                  <ServicePage />
                </Suspense>
              }
            />
            <Route
              path="now"
              element={
                <Suspense fallback={<Loading />}>
                  <NowPage />
                </Suspense>
              }
            />
          </Route>

          <Route
            path="/blog"
            element={
              <Suspense fallback={<Loading />}>
                <Layout />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<Loading />}>
                  <BlogPage data={BlogDatas} />
                </Suspense>
              }
            />
            <Route
              path=":id"
              element={
                <Suspense fallback={<Loading />}>
                  <DetailPage />
                </Suspense>
              }
            />
            <Route
              path="list"
              element={
                <Suspense fallback={<Loading />}>
                  <ListPage />
                </Suspense>
              }
            />
          </Route>

          <Route
            path="*"
            element={
              <Suspense fallback={<Loading />}>
                <NotFound />
              </Suspense>
            }
          />
        </Routes>
      </main>
      <Footer>
        <p>Copyright 2024 By Hong</p>
        {isMember ? <p>로그인 하셨네요.</p> : <p>로그인 전입니다.</p>}
      </Footer>
    </Router>
  );
}

export default App;
