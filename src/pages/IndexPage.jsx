import Footer from "../components/Footer";
import Header from "../components/Header";

import "./indexpage.css";

function IndexPage() {
  return (
    <>
      <Header></Header>
      <main>
        <div className="layout">
          <div>공지사항/갤러리</div>
          <div>배너</div>
          <div>바로가기</div>
        </div>
      </main>
      <Footer></Footer>
    </>
  );
}

// 외부에서 활용하도록
export default IndexPage;
