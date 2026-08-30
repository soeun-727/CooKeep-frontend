import { useState } from "react";

import Button from "@/components/ui/Button";

import { PROFILE_IMAGES } from "@/constants/profileImages";

export const ProfileEdit = ({
  currentImageUrl,
  onSave,
}: {
  currentImageUrl: string;
  onSave: (id: number) => void;
}) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const selectedImage =
    PROFILE_IMAGES.find(profile => profile.id === selectedId)?.imageUrl ??
    currentImageUrl;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4">
      <figure className="h-25 w-25">
        <img src={selectedImage} alt="selectedProfile" className="w-full" />
      </figure>
      <div className="flex grid grid-cols-4 gap-2">
        {PROFILE_IMAGES.map(profile => (
          <button
            key={profile.id}
            type="button"
            onClick={() => setSelectedId(profile.id)}
            className={`relative h-[70px] w-[70px] rounded-full ${
              selectedId === profile.id ? "border-green border-2" : ""
            }`}
          >
            <img
              src={profile.imageUrl}
              alt={`Profile ${profile.id}`}
              className="w-full"
            />
          </button>
        ))}
      </div>
      <Button
        onClick={() => selectedId !== null && onSave(selectedId)}
        disabled={selectedId === null}
      >
        확인
      </Button>
    </div>
  );
};
