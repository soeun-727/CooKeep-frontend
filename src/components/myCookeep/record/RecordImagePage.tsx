import { useRef } from "react";

import CameraIcon from "@/assets/mycookeep/record/camera.svg?react";
import tempFoodPhoto from "@/assets/mycookeep/record/temp_photo_large.svg";

interface RecordImagePageProps {
  imageSrc?: string;
  onImageChange: (file: File) => void;
  editMode?: boolean;
}

export default function RecordImagePage({
  imageSrc,
  onImageChange,
  editMode = true,
}: RecordImagePageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <section className="relative h-30 w-40">
      <img src={imageSrc ? imageSrc : tempFoodPhoto} alt="레시피 이미지" />
      {editMode && (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="bg-gray-0 absolute right-[5.5px] bottom-[5px] flex h-[30px] w-[30px] items-center justify-center rounded-full"
        >
          <CameraIcon className="text-gray-30 h-6 w-6" />
        </button>
      )}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        hidden
        onChange={e => {
          const file = e.target.files?.[0];
          if (file) onImageChange(file);
          e.target.value = "";
        }}
      />
    </section>
  );
}
