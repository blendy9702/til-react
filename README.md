# Grid

- https://studiomeal.com/archives/533
- https://velog.io/@brgndy/CSS-grid-속성-정리
- 표 레이아웃 만들기에 적합(칸을 구성하고 배치하는 경우)

# 실습

- App.jsx 수정

```jsx
import "./App.css";
function App() {
  return (
    <div>
      <h1>Grid</h1>
      <div className="container">
        <div className="item">A</div>
        <div className="item">B</div>
        <div className="item">C</div>
        <div className="item">D</div>
        <div className="item">E</div>
        <div className="item">F</div>
        <div className="item">G</div>
        <div className="item">H</div>
        <div className="item">I</div>
      </div>
    </div>
  );
}
export default App;
```

- src/App.css 생성

```css
.container {
  display: grid;
  /* 셀 너비 */
  /* grid-template-columns: 200px 200px 500px; */
  /* 셀 비율로 설정 */
  /* grid-template-columns: 1fr 1fr 1fr; */
  /* grid 함수 */
  /* grid-template-columns: repeat(3, 1fr); */
  /* 고정된 레이아웃 및 내용 auto */
  grid-template-columns: 200px auto 200px;

  /* 셀 높이 */
  /* grid-template-rows: 200px 200px 500px; */
  grid-template-rows: 1fr 1fr 1fr;
}
.item {
  border: 3px solid red;
}
```
