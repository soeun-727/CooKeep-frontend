import { useAddIngredientStore } from "@/stores/useAddIngredientStore";

export default function Selected() {
  const { selectedItems } = useAddIngredientStore();
  const selectedDisplay = [...selectedItems].reverse().slice(0, 5);
  const emptySlots = Array(5 - selectedDisplay.length).fill(null);
  const allSlots = [...selectedDisplay, ...emptySlots];

  return (
    <div className="flex h-22 w-[361px] items-center justify-between rounded-[10px] bg-white px-5 shadow-[0_-1px_100px_-4px_rgba(17,17,17,0.15)]">
      <div className="flex w-full items-center justify-center">
        {allSlots.map((item, idx) => (
          <div
            key={item?.id || `empty-${idx}`}
            className="flex w-[70px] flex-col items-center"
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
