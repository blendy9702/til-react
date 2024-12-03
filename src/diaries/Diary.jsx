import { useEffect, useState } from "react";

const Diary = () => {
  const initData = {
    title: "",
    content: "",
    date: "",
    mood: "funny",
    weather: "clear",
  };

  const [diariesList, setDiariesList] = useState([]);
  const [formData, setFormData] = useState(initData);

  const initPutData = {
    id: "",
    title: "",
    content: "",
    mood: "",
    weather: "",
  };

  const [putData, setPutData] = useState(initPutData);

  console.log(formData);

  const getDiaries = async () => {
    console.log("서버 접속 후...");
    try {
      const res = await fetch(`http://localhost:5000/diaries`);
      const data = await res.json();
      setDiariesList(data);
      console.log(data);
    } catch (error) {
      console.log(`에러입니다 : ${error}`);
    }
  };
  const deleteDiary = async id => {
    try {
      const res = await fetch(`http://192.168.0.66:5000/diaries/${id}`, {
        method: "DELETE",
      });
      alert("삭제 되었습니다.");
      getDiaries();
    } catch (error) {
      console.log(`네트워크 오류. ${error}`);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.title || !formData.content || !formData.date) {
      alert("빈칸 없이 작성하도록 하자.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/diaries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("등록에 성공!");
        setFormData(initData);
      }
    } catch (error) {
      console.error(`네트워크 오류: ${error}`);
      alert(`나중에 다시 시도해주세요.`);
    }
  };

  const handleReset = () => {
    setFormData(initData);
    alert("초기화 완료");
  };
  useEffect(() => {
    getDiaries();
  }, []);

  return (
    <div>
      <h1>다이어리</h1>
      <div>
        <form onSubmit={e => handleSubmit(e)}>
          <div>
            <label>제목</label>
            <input
              type="text"
              name="title"
              value={FormData.title}
              onChange={e => handleChange(e)}
            />
          </div>
          <div>
            <label>날짜</label>
            <input
              type="date"
              name="date"
              value={formData.data}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>내용</label>
            <textarea
              type="text"
              name="content"
              value={formData.content}
              onChange={handleChange}
            ></textarea>
          </div>
          <div>
            <label>오늘 나의 기분은</label>
            <select
              name="mood"
              value={formData.content}
              onChange={handleChange}
            >
              <option value="funny">즐거움😀</option>
              <option value="happy">기쁨😊</option>
              <option value="normal">평범🙃</option>
              <option value="angry">화남🤬</option>
              <option value="sad">슬픔😭</option>
            </select>
          </div>
          <div>
            <label>오늘의 날씨</label>
            <select
              name="weather"
              value={formData.weather}
              onChange={handleChange}
            >
              <option value="clear">맑음☀️</option>
              <option value="cloudy">흐림☁️</option>
              <option value="rain">비🌧️</option>
              <option value="snow">눈🌨️</option>
            </select>
          </div>
          <div>
            <button type="submit">등록</button>
            <button onClick={handleReset}>초기화</button>
          </div>
        </form>
      </div>
      <div>
        <h3>전체 다이어리</h3>
        <div>
          {diariesList.map(item => {
            return (
              <div key={item.id}>
                {item.id} : {item.title}
                <button
                  type="button"
                  onClick={() => {
                    deleteDiary(item.id);
                  }}
                >
                  삭제
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Diary;
