import Button from "@/components/ui/Button";

interface InputModalProps {
  title: string;
  buttonTexts?: string[];
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onConfirm: () => void;
  onClose: () => void;
}
export const InputModal = ({
  title,
  buttonTexts = ["변경", "취소"],
  placeholder,
  value,
  onChange,
  onConfirm,
  onClose,
}: InputModalProps) => {
  return (
    <div className="fixed inset-0 z-100 mx-auto flex max-w-[450px] items-center justify-center">
      {/* backdrop */}
      <div className="bg-gray-80/50 absolute inset-0" onClick={onClose} />
      <section className="z-100 flex w-[300px] flex-col gap-6 rounded-xl bg-white p-6">
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="typo-l-strong">{title}</p>
          <div>
            {value && <span className="typo-m text-gray-80">[</span>}
            <input
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              style={{
                width: value ? `calc(${value.length}ch + 0.5rem)` : "100%",
              }}
              className="typo-m placeholder:text-gray-30 text-gray-80 flex-1 bg-transparent text-center outline-none"
            />
            {value && <span className="typo-m text-gray-80">]</span>}
          </div>
        </div>

        <div className="flex gap-2">
          {buttonTexts.map((text, i) => (
            <Button
              key={text}
              variant={i === 0 ? "green" : "gray"}
              onClick={i === 0 ? onConfirm : onClose}
            >
              {text}
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
};
