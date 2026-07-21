import MailNotiIcon from "@/assets/fridge/AppBar/mail_notification.svg?react";
import SettingIcon from "@/assets/fridge/AppBar/setting.svg?react";

export const AppBar = () => {
  return (
    <div className="flex justify-end">
      <MailNotiIcon className="h-10 w-10" />
      <SettingIcon className="h-10 w-10" />
    </div>
  );
};
