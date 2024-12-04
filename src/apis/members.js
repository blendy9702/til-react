import { API_URL, axiosInstance } from "./config";

export const getMembers = async setMemberList => {
  try {
    const res = await axiosInstance.get(`${API_URL}`);
    console.log(res.status);
    // 정상적으로 데이터의 결과가 있으면
    // API 회신의 200 류의 값은 성공입
    const responseStatus = res.status.toString().charAt(0);
    if (responseStatus === "2") {
      return res.data;
    } else {
      console.log("데이터가 없어요.");
      return [];
    }
  } catch (error) {
    // 404 또는 400 류라면 나를 의심하자.
    const errorStatus = error.response.status.toString().charAt(0);
    if (errorStatus === "5") {
      alert("서버가 꺼짐요.");
    }
    if (errorStatus === "4") {
      alert("호출에 실패함.");
    }
    console.log(error);
    return [];
  }
};
export const deleteMember = async id => {
  try {
    const res = await axiosInstance.delete(`${API_URL}/${id}`);
    return "success";
  } catch (error) {
    console.log(error);
    return "fail";
  }
};
