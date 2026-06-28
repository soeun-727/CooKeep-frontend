import icon from "@/assets/onboarding/appIcon.svg";

interface ExampleNotificationProps {
  title: string;
  description: string;
}

export default function ExampleNotification({
  title,
  description,
}: ExampleNotificationProps) {
  return (
    <div className="flex h-[81px] w-[259px] flex-col gap-[5px] rounded-[4.32px] bg-white p-[7px] shadow-[0px_1.4px_6.6px_0px_rgba(17,17,17,0.20)]">
      <div className="flex gap-[5px]">
        <img src={icon} className="w-3" />
        <span className="text-[9.5px] font-normal text-[#616164]">CooKeep</span>
      </div>
      <span className="text-[10px] font-medium">{title}</span>
      <span className="text-[8.5px] leading-snug font-normal break-keep whitespace-pre-wrap">
        {description}
      </span>
    </div>
  );
}
