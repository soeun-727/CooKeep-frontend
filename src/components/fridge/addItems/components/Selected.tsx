import { useAddIngredientStore } from "../../../../stores/useAddIngredientStore";

export default function Selected() {
  const { selectedItems } = useAddIngredientStore();
  const selectedDisplay = [...selectedItems].reverse().slice(0, 5);
  const emptySlots = Array(5 - selectedDisplay.length).fill(null);
  const allSlots = [...selectedDisplay, ...emptySlots];

  return (
    <div
      className="w-[361px] h-22 bg-white rounded-[10px] px-5 flex items-center justify-between 
      shadow-[0_-1px_100px_-4px_rgba(17,17,17,0.15)]"
    >
      <div className="flex items-center justify-center w-full">
        {allSlots.map((item, idx) => (
          <div
            key={item?.id || `empty-${idx}`}
            className="flex flex-col items-center w-[70px]"
          >
            {item ? (
              <>
                <div className="w-11 h-11 flex items-center justify-center animate-in fade-in zoom-in duration-300">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="typo-caption !font-medium text-black truncate w-full text-center">
                  {item.name}
                </span>
              </>
            ) : (
              <div className="w-11 h-11 flex items-center justify-center">
                <div className="w-2 h-2 bg-gray-200 rounded-full" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
