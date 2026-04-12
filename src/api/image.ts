import api from "./axios";

export interface ImageUploadResponse {
  status: string;
  timestamp: string;
  data: {
    imageUrl: string;
  };
}

export const uploadImage = async (file: File): Promise<ImageUploadResponse> => {
  const formData = new FormData();
  formData.append("image", file, file.name);
  const res = await api.post<ImageUploadResponse>(
    `/api/images?folder=RECIPE_IMAGES`,
    formData,
    // {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // },
  );

  return res.data;
};

/** [DELETE] 이미지 삭제 API */
export const deleteImage = async (imageUrl: string) => {
  const res = await api.delete(
    `/api/images?imageUrl=${encodeURIComponent(imageUrl)}`,
  );
  return res.data;
};
