// src/components/auth/AuthHeader.tsx
import { mainLogo } from "../../assets";
import settings from "../../assets/fixed/settings.svg";
import { useNavigate } from "react-router-dom";
import backIcon from "../../assets/back.svg";
import { useIngredientStore } from "../../stores/useIngredientStore";
interface MainHeaderProps {
  isAllView: boolean;
}
const MainHeader = ({ isAllView }: MainHeaderProps) => {
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
    <header className="top-0 left-0 z-50 pointer-events-none w-full max-w-[450px]">
      <div className="mx-auto max-w-[450px] pointer-events-auto">
        <div className="h-12 flex items-center justify-between pb-1 bg-[#FAFAFA]">
          <div className="flex-1 flex">
            {isAllView ? (
              <button onClick={handleBack}>
                <img className="ml-[18px] h-9" src={backIcon} />
              </button>
            ) : (
              <img
                src={mainLogo}
                alt="CooKeep logo"
                className="w-24 object-contain pb-1 ml-[31px] mt-1"
              />
            )}
          </div>

          <div className="w-9 h-9 flex items-center justify-end mr-[15px]">
            <button className="" onClick={handleSettings}>
              <img src={settings} alt="settings" className="w-9" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MainHeader;
