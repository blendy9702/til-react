# React 복습

## 1. 퍼블리싱

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

const PublishPage = () => {
  return (
    <>
      <header className="header">
        <a href="#" className="logo">
          로고
        </a>
        <nav className="gnb">내용</nav>
      </header>
      <main className="main">
        <div className="slide">슬라이드</div>
        <div className="content">
          <div className="notice">공지사항</div>
          <div className="banner">배너</div>
          <div className="link">바로가기</div>
        </div>
      </main>
      <footer className="footer">
        <a href="#" className="gooter-logo">
          로고
        </a>
        <p className="copyright">Copyright</p>
        <div className="sns">SNS</div>
      </footer>
    </>
  );
};
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PublishPage></PublishPage>
  </StrictMode>,
);
```

## 2. 컴포넌트

- 기본은 `/src/components` 폴더, `/src/pages` 폴더 생성
- 각 페이지는 무엇이 나올지 회의
- 각 페이지에 공통으로 출력될 원본 컴포넌트는 무엇이 필요한지 회의

## 2.1. 페이지 검토 결과

- /src/pages/IndexPage.jsx 생성

### 2.2. 컴포넌트 검토결과

- /src/components/header/Header.jsx
- /src/components/footer/Footer.jsx

### 2.3. 파일을 만들고 화면에 나오면 꼼꼼히 작업 시작

- 소스 참조

## 3. css

- IndexPage.jsx 를 대상으로 복습
- 회사에서 하듯이 해보자.
- `/src/styles` 폴더 만들기
- `/src/styles/pages` 폴더 만들기
- `/src/styles/components` 폴더 만들기

### 3.1. INdexPage.jsx 를 위한 css

- `/src/styles/pages/` 폴더에 index-page.css 만들기

## 4. module.css

- `.module.css` 꼭 지키기!
- `/src/components/header/Header.jsx`
- `/src/styles/header/header.module.css` 만들기

## 5. scss

- `/src/components/footer/Footer.jsx`
- `/src/styles/footer/footer.module.scss` 만들기

## 6. object.css

### 6.1. inline Object css

- 객체 리터럴
- 적극적으로 사용함
- `/src/components/notice/Notice.jsx`

### 6.2. Object 변수 만들고 css 적용

- 객체 리터럴
- 적극적으로 사용함
- 가능하면 `export 로 외부 파일`에서 참조하자.
- `/src/components/banner/Banner.jsx`

## 7. CSS-in-JS(Emotion)

- 가능하면 `컴포넌트` 생성하고, 그 컴포넌트에 `적용`하자.
- `/src/pages/IndexPage.jsx`
- 장점은 이름만 보아도 구분이 가능함.
  : `<div>` 태그만으로는 내용 배치 구분이 어려움.
  : 컴포넌트 처럼 재활용이 가능함.
  : 공통으로 사용하는 경우라면 `props`로 조절이 가능함.
