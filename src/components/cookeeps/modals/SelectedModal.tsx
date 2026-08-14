interface SelectedModalProps {
  isOpen: boolean;
  onClose: () => void;
  plant: string;
  image: string;
  description: string;
  onConfirm: () => void;
}

export default function SelectedModal({
  isOpen,
  onClose,
  plant,
  image,
  description,
  onConfirm,
}: SelectedModalProps) {
  if (!isOpen) return null;

  return (
    <div className="bg-black-overlay fixed inset-0 z-[150] flex items-center justify-center">
      {/* Backdrop */}
      <div className="bg-gray-80 absolute inset-0" onClick={onClose} />
      {/* modal */}
      <div className="bg-gray-0 rounded-L relative flex h-64 w-70 flex-col items-center px-7 pt-[35px] pb-[25px]">
        <h2 className="typo-body text-center">
          <span className="text-green-deep">{plant} </span>
          <span>을/를 키워볼까요?</span>
        </h2>
        <img src={image} alt={plant} className="w-25 object-contain" />
        <div className="-mt-2 flex flex-col items-center">
          <div className="h-0 w-0 border-r-[6px] border-b-[8px] border-l-[6px] border-gray-200 border-r-transparent border-l-transparent" />
          <div className="rounded-XS flex items-center justify-center bg-gray-200 px-[10px] py-[3px]">
            <span className="text-center text-[8px] leading-tight text-gray-50">
              {description}
            </span>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={onConfirm}
            className="typo-label text-gray-0 bg-green rounded-M h-11 w-27"
          >
            시작하기
          </button>
          <button
            onClick={onClose}
            className="typo-label text-gray-0 bg-gray-80 rounded-M h-11 w-27"
          >
            다시 고를래요
          </button>
        </div>
      </div>
    </div>
  );
}
