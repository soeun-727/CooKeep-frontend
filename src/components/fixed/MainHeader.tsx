// src/components/auth/MainHeader.tsx
import { mainLogo } from "@/assets/index";
import settings from "@/assets/fixed/settings.svg";
import { useNavigate } from "react-router-dom";
import backIcon from "@/assets/back.svg";
import { useIngredientStore } from "@/stores/useIngredientStore";
interface MainHeaderProps {
  isAllView: boolean;
}

export default function MainHeader({ isAllView }: MainHeaderProps) {
  const navigate = useNavigate();
  const { setViewCategory } = useIngredientStore();
  const handleSettings = () => {
    navigate("/settings", {
      state: { from: location.pathname },
    });
  };
  const handleBack = () => {
    setViewCategory(null);
  };

  return (
    <header className="fixed top-0 z-50 pointer-events-none w-full max-w-[450px]">
      <div className="mx-auto max-w-[450px] pointer-events-auto">
        <div className="flex items-center justify-between bg-background">
          <div className="h-12 flex-1 flex">
            {isAllView ? (
              <button onClick={handleBack}>
                <img className="ml-[18px] h-9" src={backIcon} />
              </button>
            ) : (
              <img
                src={mainLogo}
                alt="CooKeep logo"
                className="ml-[31px] w-24 object-contain pb-1"
              />
            )}
          </div>

          <div className="mr-[15px] flex h-9 w-9 items-center justify-end">
            <button className="" onClick={handleSettings}>
              <img src={settings} alt="settings" className="w-9" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
