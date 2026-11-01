import ArrowRight from "@/assets/fridge/arrow_right.svg?react";
import coupangLogo from "@/assets/shopping/coupang-logo.png";

import Button from "@/components/ui/Button";

import type { ShoppingBannerData } from "@/types/shopping";

interface ShoppingBannerProps {
  size: "small" | "medium" | "large";
  data?: ShoppingBannerData;
}

export default function ShoppingBanner({ size, data }: ShoppingBannerProps) {
  const isLarge = size === "large";
  const isSmall = size === "small";
  const openBanner = () => {
    if (data?.landingUrl)
      window.open(data.landingUrl, "_blank", "noopener,noreferrer");
  };
  const title = (
    <>
      남김없이 딱 맞게!{isLarge ? <br /> : " "}
      <span className="text-green-deep">1인분</span> 장보기
    </>
  );

  if (isSmall) {
    return (
      <button
        type="button"
        disabled={!data?.landingUrl}
        onClick={openBanner}
        className="bg-green-exception flex h-14 w-full items-center gap-3 overflow-hidden px-4 text-left"
      >
        <span className="min-w-0 flex-1">
          <span className="typo-m-strong text-gray-80 block">{title}</span>
          <span className="typo-caption block text-gray-50">
            혼자 먹기 좋은 소포장 식재료 모음
          </span>
        </span>
        <span className="h-[56px] w-[70px] shrink-0 overflow-hidden">
          {data?.imageUrl && (
            <img
              src={data.imageUrl}
              alt=""
              className="h-full w-full object-contain mix-blend-darken"
            />
          )}
        </span>
        <img
          src={coupangLogo}
          alt="쿠팡"
          className="w-10 shrink-0 self-start pt-2"
        />
      </button>
    );
  }

  return (
    <aside
      className={`text-gray-80 flex w-full gap-2 overflow-hidden px-4 ${isLarge ? "bg-gray-exception h-[240px] items-center py-6" : "bg-green-exception h-[104px] items-center"}`}
    >
      {!isLarge && (
        <div className="h-[104px] w-[110px] shrink-0">
          {data?.imageUrl && (
            <img
              src={data.imageUrl}
              alt=""
              className="h-full w-full object-contain mix-blend-darken"
            />
          )}
        </div>
      )}
      <div
        className={`flex min-w-0 flex-1 flex-col justify-between ${isLarge ? "h-full" : "h-full py-3"}`}
      >
        {isLarge && <img src={coupangLogo} alt="쿠팡" className="w-[60px]" />}
        <div>
          <h2 className={isLarge ? "typo-h3" : "typo-l-strong"}>{title}</h2>
          <p className={`typo-caption ${isLarge ? "mt-2" : "text-gray-50"}`}>
            {isLarge ? data?.productName : "혼자 먹기 좋은 소포장 식재료 모음"}
          </p>
        </div>
        {isLarge ? (
          <Button
            disabled={!data?.landingUrl}
            onClick={openBanner}
            className="!rounded-L !h-9 !text-sm"
          >
            바로가기 <ArrowRight className="h-6 w-6" />
          </Button>
        ) : (
          <div className="flex items-end justify-between gap-2">
            <button
              type="button"
              disabled={!data?.landingUrl}
              onClick={openBanner}
              className="typo-m-strong flex items-center"
            >
              바로가기 <ArrowRight className="h-6 w-6" />
            </button>
            <img src={coupangLogo} alt="쿠팡" className="mb-1 w-[50px]" />
          </div>
        )}
      </div>
      {isLarge && (
        <div className="h-[174px] w-[174px] shrink-0 max-[375px]:w-[140px]">
          {data?.imageUrl && (
            <img
              src={data.imageUrl}
              alt=""
              className="h-full w-full object-contain mix-blend-darken"
            />
          )}
        </div>
      )}
    </aside>
  );
}
