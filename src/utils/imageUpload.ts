import { uploadImage } from "@/api/image";
import imageCompression from "browser-image-compression";

const MAX_FILE_SIZE = 15 * 1024 * 1024;

const compressionOptions = {
  maxSizeMB: 0.7,
  maxWidthOrHeight: 720,
  useWebWorker: true,
  initialQuality: 0.7,
  alwaysKeepResolution: false,
};

export class ImageTooLargeError extends Error {}

export async function compressAndUploadImage(file: File): Promise<string> {
  if (file.size > MAX_FILE_SIZE) {
    throw new ImageTooLargeError(
      "이미지가 너무 큽니다. 해상도를 낮춰서 다시 시도해주세요.",
    );
  }

  const compressedBlob = await imageCompression(file, compressionOptions);
  const compressedFile = new File([compressedBlob], file.name, {
    type: compressedBlob.type,
  });
  const response = await uploadImage(compressedFile);
  return response.data.imageUrl;
}
