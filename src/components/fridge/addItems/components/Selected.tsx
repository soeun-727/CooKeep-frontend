import { useAddIngredientStore } from "@/stores/useAddIngredientStore";

interface SelectedProps {
  isGuest?: boolean;
  isGuestSelected?: boolean;
  guestImage?: string;
}

export default function Selected({
  isGuest = false,
  isGuestSelected = false,
  guestImage,
}: SelectedProps) {
  const { selectedItems } = useAddIngredientStore();

  let selectedDisplay = [];

  if (isGuest) {
    selectedDisplay =
      isGuestSelected && guestImage
        ? [{ id: "guest-bagel", name: "베이글", image: guestImage }]
        : [];
  } else {
    selectedDisplay = [...selectedItems].reverse().slice(0, 5);
  }

  const emptySlots = Array(5 - selectedDisplay.length).fill(null);
  const allSlots = [...selectedDisplay, ...emptySlots];

  return (
    <div className="bg-gray-0 shadow-recent-b rounded-M flex h-22 w-full items-center justify-between px-5">
      <div className="flex w-full items-center justify-center">
        {allSlots.map((item, idx) => (
          <div
            key={item?.id || `empty-${idx}`}
            className="flex w-full flex-col items-center"
          >
            {item ? (
              <>
                <div className="animate-in fade-in zoom-in flex h-11 w-11 items-center justify-center duration-300">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-contain"
                  />
                </div>
                <span className="typo-caption w-full truncate text-center !font-medium text-black">
                  {item.name}
                </span>
              </>
            ) : (
              <div className="flex h-11 w-11 items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-gray-200" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
