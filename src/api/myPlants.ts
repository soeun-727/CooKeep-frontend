// src/api/myPlants.ts
import axios from "./axios";
import type { ApiResponse } from "./types";

export const getMyPlants = async () => {
  const res = await axios.get("/api/my-plants");
  return res.data.data; // MyPlant[]
};

// src/api/myPlants.ts

// 1. 등록 응답 데이터 타입
// 식물 등록 시 data 필드에 들어올 구체적인 타입
export interface RegisterResponseData {
  userPlantId: number;
  message: string;
}

// 2. 등록 API 함수 수정
export const registerMyPlant = async (plantId: number) => {
  // ApiResponse의 제네릭에 위에서 만든 인터페이스를 넣습니다.
  const res = await axios.post<ApiResponse<RegisterResponseData>>(
    `/api/my-plants/${plantId}`,
  );
  return res.data;
};

export const waterMyPlant = async (userPlantId: number) => {
  const res = await axios.post(`/api/my-plants/${userPlantId}/water`);
  return res.data;
};

export const deleteMyPlant = async (userPlantId: number) => {
  const res = await axios.delete(`/api/my-plants/${userPlantId}`);
  return res.data;
};

export const reviveMyPlant = async (userPlantId: number) => {
  const res = await axios.post(`/api/my-plants/${userPlantId}/revive`);
  return res.data;
};

export const setProfileMyPlant = async (userPlantId: number) => {
  const res = await axios.patch(`/api/my-plants/${userPlantId}/profile`);
  return res.data;
};

export const getGrowingPlant = async () => {
  const res = await axios.get("/api/my-plants/growing-plant");
  return res.data.data; // 단일 객체 | null
};
