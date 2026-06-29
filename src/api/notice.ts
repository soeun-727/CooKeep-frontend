import { NoticeApiResponse } from "@/types/notice";

import api from "./axios";

export const getNotices = async () => {
  const res = await api.get<NoticeApiResponse>("/api/notices");
  return res.data;
};
