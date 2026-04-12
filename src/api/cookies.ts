import axios from "./axios";

export const getMyCookies = async (): Promise<number> => {
  const res = await axios.get("/api/users/me/cookies");
  return res.data.data; // number
};
