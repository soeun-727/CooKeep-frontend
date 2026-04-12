import icon from "../../../assets/onboarding/appIcon.svg";

interface Props {
  title: string;
  description: string;
}

export default function ExampleNotification({ title, description }: Props) {
  return (
    <div
      className="w-[259px] h-[81px] rounded-[4.32px] p-[7px] bg-white flex flex-col
    shadow-[0px_1.4px_6.6px_0px_rgba(17,17,17,0.20)] gap-[5px]"
    >
      <div className="flex gap-[5px]">
        <img src={icon} className="w-3" />
        <span className="text-[#616164] text-[9.5px] font-normal">CooKeep</span>
      </div>
      <span className="text-[10px] font-medium">{title}</span>
      <span className="text-[8.5px] font-normal leading-snug whitespace-pre-wrap break-keep">
        {description}
      </span>
    </div>
  );
}
