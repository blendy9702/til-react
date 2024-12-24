import { useRef } from "react";

const App = () => {
  const videoRef = useRef(null);
  const prevV = () => {
    videoRef.current.currentTime -= 10;
    videoRef.current.play();
  };
  const playV = () => {
    videoRef.current.currentTime = 0;
    videoRef.current.play();
  };
  const stopV = () => {
    videoRef.current.currentTime = 0;
    videoRef.current.pause();
  };
  const nextV = () => {
    videoRef.current.currentTime += 10;
    videoRef.current.play();
  };
  return (
    <div>
      <h1>비디오 제어</h1>
      <video ref={videoRef} src="비디오주소" autoPlay muted controls></video>
      <div>
        <button onClick={prevV}>10초전</button>
        <button onClick={playV}>play</button>
        <button onClick={stopV}>stop</button>
        <button onClick={nextV}>10초후</button>
      </div>
    </div>
  );
};

export default App;
