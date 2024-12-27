import { useAxios } from "./hooks/useAxios";
import useComponent from "./hooks/useComponent";
import { useCount } from "./hooks/useCounter";
import { uselogin } from "./hooks/useLogin";

function App() {
  const { count, plus, minus } = useCount(100);
  const { data, error, loading } = useAxios();
  const { data, loading, error, isLogin, login } = uselogin();
  const windowSize = useComponent();
  return (
    <div>
      <h1>카운트 : {count}</h1>
      <button onClick={() => plus()}>증가</button>
      <button onClick={() => minus()}>감소</button>
    </div>
  );
}

export default App;
