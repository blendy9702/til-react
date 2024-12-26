import { useCallback, useState } from "react";

const App = () => {
  const [query, setQuery] = useState();
  // query 가 변경이 된다면 그때 함수를 다시 정의하겠다.
  const handleSearch = useCallback(() => {
    console.log("query 변경됨", query);
  }, [query]);
  return (
    <div>
      <h1>state 변경시 함수 재실행</h1>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={handleSearch}>검색</button>
    </div>
  );
};

export default App;
