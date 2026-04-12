import api from "./axios";
import { NoticeApiResponse } from "../types/notice";

export const getNotices = async () => {
  const res = await api.get<NoticeApiResponse>("/api/notices");
  return res.data;
};
