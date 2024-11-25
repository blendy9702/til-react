# React 컴포넌트 만들기

## 1. 컴포넌트란?

- 웹 페이지의 `각 요소 중` 재활용이 되는 내용을 별도의 jsx로 생성한 것
- 예) header.jsx, footer.jsx 등..

## 2. `Component` 와 `Page` 를 구분해 본다.

- 수업 중 `Page` 라고 얘기하면 `Component` 들을 모아서 하나의 페이지를 구성한다는 의미.
- 추후에 `pages` 폴더를 생성하야 함.
- `폴더는 소문자` - window 에서는 대소문자 구분안함.
- 추후에 `component` 폴더를 생성해야 함..

## 3. 컴포넌트의 이해

### 3.1. html 을 react 에서는 `jsx` 라고 호칭함.

- `js 로 html을 생성하는 역할`
- 함수명이 대문자로 시작한 파스칼 케이스
- jsx 를 출력하는 함수는 파스칼 케이스를 쓰도록 하자
- jsx 를 출력하는 함수는 반드시 `return` () 구문이 있어야 함.
- () 안쪽에 html 형식을 작성한다
- jsx는 `html 태그 형식`으로 호출(call) 함
- jsx는 반드시 `root 태그`가 존재해야 한다.
- 용도가 묶음을 만드는 것 ㅗ이에 없는 Roog 라면 `<></>` Fragment 로 묶어준다.

### 3.2. 각 `화면의 기능`에 따라서 파일을 분리한다.

- `협업`을 해야 하므로 각 기능별 단위마다 별도의 컴포넌트 관리 필요.
- `/src/pages` 폴더에는 URL 주소에 맞는 페이지 배치
- `/src/components` 폴더에는 각각의 페이지에 배치될 html 요소들 배치

- /src/components/Header.jsx

```jsx
const Header = () => {
  return (
    <header>
      <a href="#">로고</a>
      <div>
        <ul>
          <li>
            <a href="#">주메뉴</a>
          </li>
          <li>
            <a href="#">주메뉴</a>
          </li>
          <li>
            <a href="#">주메뉴</a>
          </li>
          <li>
            <a href="#">주메뉴</a>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
```

- /src/components/Footer.jsx

```jsx
const Footer = () => {
  return (
    <footer>
      <a href="#">로고</a>
      <div>카리파이터</div>
      <div>SNS</div>
    </footer>
  );
};

export default Footer;
```

- /src/Pages/IndexPage.jsx

```jsx
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
```

- /src/Pages/CeoPage.jsx

```jsx
import Footer from "../components/Footer";
import Header from "../components/Header";

function CeoPage() {
  return (
    <>
      <Header></Header>
      <main>대표인사말</main>
      <Footer></Footer>
    </>
  );
}

export default CeoPage;
```
