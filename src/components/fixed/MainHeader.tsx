import { useNavigate } from "react-router-dom";

import { useIngredientStore } from "@/stores/useIngredientStore";

import BackIcon from "@/assets/back.svg?react";
import SettingsIcon from "@/assets/fixed/settings.svg?react";
import { MainLogo } from "@/assets/index";

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
    <header className="pointer-events-none fixed top-0 z-50 w-full max-w-[450px]">
      <div className="pointer-events-auto mx-auto max-w-[450px]">
        <div className="bg-background flex items-center justify-between">
          <div className="flex h-12 flex-1">
            {isAllView ? (
              <button onClick={handleBack}>
                <BackIcon className="ml-[18px] h-9" />
              </button>
            ) : (
              <MainLogo
                aria-label="CooKeep logo"
                role="img"
                className="ml-[31px] w-24 object-contain pb-1"
              />
            )}
          </div>

          <div className="mr-[15px] flex h-9 w-9 items-center justify-end">
            <button className="" onClick={handleSettings}>
              <SettingsIcon aria-label="settings" role="img" className="w-9" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
