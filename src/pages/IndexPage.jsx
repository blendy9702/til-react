import Footer from "../components/Footer";
import Header from "../components/Header";

function IndexPage() {
  return (
    <>
      <Header></Header>
      <main>
        <div>공지사항/갤러리</div>
        <div>배너</div>
        <div>바로가기</div>
      </main>
      <Footer></Footer>
    </>
  );
}

// 외부에서 활용하도록
export default IndexPage;
