// import MailNotiIcon from "@/assets/fridge/AppBar/mail_notification.svg?react";
import SettingIcon from "@/assets/fridge/AppBar/setting.svg?react";
import { useNavigate } from "react-router-dom";

export const AppBar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-end">
      {/* <MailNotiIcon className="h-10 w-10" /> */}
      <button
        type="button"
        onClick={() => navigate("/settings")}
        aria-label="설정"
      >
        <SettingIcon className="h-10 w-10" />
      </button>
    </div>
  );
};
