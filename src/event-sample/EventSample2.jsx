import { useState } from "react";

const EventSample2 = () => {
  const initialFormData = {
    nameTyping: "",
    idTyping: "",
  };

  const [typing, setTyping] = useState(initialFormData);
  const [error, setError] = useState("");

  const handleChange = event => {
    const { name, value } = event.target;
    setTyping(prev => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleKeyDown = event => {
    if (event.key === "Enter") {
      const expectedValue = "legend";
      if (typing.idTyping !== expectedValue) {
        setError("다시 입력!");
      } else {
        alert("You are doing very well :)");
        setTyping(initialFormData);
      }
    }
  };

  return (
    <div>
      <h2>영타 수준을 체크 해보자.</h2>
      <legend>test typing</legend>
      <input
        type="text"
        name="idTyping"
        id="idTyping"
        value={typing.idTyping}
        placeholder="시작을 해보자."
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}{" "}
    </div>
  );
};

export default EventSample2;
