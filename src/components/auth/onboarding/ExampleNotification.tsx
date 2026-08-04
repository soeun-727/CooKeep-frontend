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
    <div className="bg-gray-0 shadow-container flex h-[71px] w-71 flex-col gap-[6px] rounded-[8px] px-3 py-2">
      <div className="flex gap-1">
        <img src={icon} className="w-[14px]" />
        <span className="text-[8px] leading-3 font-normal text-gray-50">
          CooKeep
        </span>
      </div>
      <span className="text-[10px] leading-3 font-semibold">{title}</span>
      <span className="text-[8px] leading-2.5 font-normal break-keep whitespace-pre-wrap">
        {description}
      </span>
    </div>
  );
}
