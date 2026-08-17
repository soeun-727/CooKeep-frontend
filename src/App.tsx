import { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";

import AddItemLayout from "@/layouts/AddItemLayout";
import AppLayout from "@/layouts/AppLayout";
import CookeepsLayout from "@/layouts/CookeepsLayout";
import Layout from "@/layouts/Layout";
import ListLayout from "@/layouts/ListLayout";
import SettingsLayout from "@/layouts/SettingsLayout";
import VerifyLayout from "@/layouts/VerifyLayout";

import FindLayout from "@/components/auth/find/FindLayout";
import RequireFindAuth from "@/components/auth/find/RequireFindAuth";
import LoadingScreen from "@/components/ui/LoadingScreen";

import ExcludedIngredientPage from "./pages/myCookeep/ExcludedIngrdientPage";
import { useAuthStore } from "./stores/useAuthStore";

const SplashPage = lazy(() => import("@/pages/SplashPage"));
const InitialPage = lazy(() => import("@/pages/auth/InitialPage"));
const LoginPage = lazy(() => import("@/pages/auth/LoginPage"));
const GuestPage = lazy(() => import("@/pages/auth/GuestPage"));
const OnboardingPage = lazy(() => import("@/pages/auth/OnboardingPage"));
const SignupPage = lazy(() => import("@/pages/auth/SignupPage"));
const SimpleLoginAgreementPage = lazy(
  () => import("@/pages/auth/SimpleLoginAgreementPage"),
);
const FindPage = lazy(() => import("@/pages/auth/FindPage"));
const KakaoLoginCallback = lazy(
  () => import("@/components/auth/simplelogin/KakaoLoginCallback"),
);
const GoogleLoginCallback = lazy(
  () => import("@/components/auth/simplelogin/GoogleLoginCallback"),
);
const ResetPassword = lazy(
  () => import("@/components/auth/find/ResetPassword"),
);

const FridgePage = lazy(() => import("@/pages/fridge/FridgePage"));
const AddItemPage = lazy(() => import("@/pages/fridge/AddItemPage"));
const Details = lazy(() => import("@/components/fridge/addItems/Details"));

const RecipePage = lazy(() => import("@/pages/recipe/RecipePage"));
const RecipeIntroPage = lazy(() => import("@/pages/recipe/RecipeIntroPage"));
const RecipeSelectPage = lazy(() => import("@/pages/recipe/RecipeSelectPage"));
const RecipeConfirmPage = lazy(
  () => import("@/pages/recipe/RecipeConfirmPage"),
);
const RecipeLoadingPage = lazy(
  () => import("@/pages/recipe/RecipeLoadingPage"),
);
const RecipeResultPage = lazy(() => import("@/pages/recipe/RecipeResultPage"));

const CookeepsPage = lazy(() => import("@/pages/cookeeps/CookeepsPage"));
const MyPlantPage = lazy(() => import("@/pages/cookeeps/MyPlantPage"));
const RecipeDetailPage = lazy(
  () => import("@/pages/cookeeps/RecipeDetailPage"),
);
const ViewAllPage = lazy(() => import("@/pages/cookeeps/ViewAllPage"));
const ViewListPage = lazy(() => import("@/pages/cookeeps/ViewListPage"));

const MyCookeepPage = lazy(() => import("@/pages/myCookeep/MyCookeepPage"));
const SetGoalPage = lazy(() => import("@/pages/myCookeep/SetGoalPage"));
const RecordSelectPage = lazy(
  () => import("@/pages/myCookeep/RecordSelectPage"),
);
const RecordWritePage = lazy(() => import("@/pages/myCookeep/RecordWritePage"));
const RecordDetailPage = lazy(
  () => import("@/pages/myCookeep/RecordDetailPage"),
);
const RecordListPage = lazy(() => import("@/pages/myCookeep/RecordListPage"));

const SettingsPage = lazy(() => import("@/pages/settings/SettingsPage"));
const EditEmailPage = lazy(() => import("@/pages/settings/EditEmailPage"));
const EditPasswordPage = lazy(
  () => import("@/pages/settings/EditPasswordPage"),
);
const EditPasswordEmailSection = lazy(
  () => import("@/components/settings/sections/EditPasswordEmailSection"),
);
const FaqPage = lazy(() => import("@/pages/settings/FaqPage"));
const NoticePage = lazy(() => import("@/pages/settings/NoticePage"));
const AgreementDetailPage = lazy(
  () => import("@/pages/settings/AgreementDetailPage"),
);
const WithdrawPage = lazy(() => import("@/pages/settings/WithdrawPage"));
const WithdrawDonePage = lazy(
  () => import("@/pages/settings/WithdrawDonePage"),
);
const SupportPage = lazy(() => import("@/pages/settings/SupportPage"));

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { initializeAuth, isLoggedIn, initialized } = useAuthStore();
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem("splash_watched");
  });
  const isCallback = location.pathname.includes("callback");

  useEffect(() => {
    initializeAuth();
    let splashTimer: ReturnType<typeof setTimeout>;

    if (showSplash) {
      splashTimer = setTimeout(() => {
        sessionStorage.setItem("splash_watched", "true");
        setShowSplash(false);
      }, 2000);
    }
    return () => {
      if (splashTimer) clearTimeout(splashTimer);
    };
  }, [initializeAuth, showSplash]);

  useEffect(() => {
    if (!initialized || isCallback || showSplash) return;

    const path = location.pathname;
    const publicPaths = [
      "/",
      "/login",
      "/signup",
      "/onboarding",
      "/guest",
      "/simplelogin",
      "/findpw",
      "/reset-password",
      "/settings/withdraw/done", // 추가
    ];
    const isPublic = publicPaths.includes(path);

    if (isLoggedIn) {
      if (path === "/" || path === "/login") {
        navigate("/fridge", { replace: true });
      }
    } else {
      if (!isPublic) {
        console.log("Not logged in, redirecting to /");
        navigate("/", { replace: true });
      }
    }
  }, [
    initialized,
    isLoggedIn,
    location.pathname,
    navigate,
    isCallback,
    showSplash,
  ]);

  useEffect(() => {
    if (!window.gtag) return;

    window.gtag("config", "G-RT9D555519", {
      page_path: location.pathname + location.search,
    });
  }, [location.pathname, location.search]);

  if (showSplash && !isCallback) {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <SplashPage />
      </Suspense>
    );
  }

  return (
    <AppLayout>
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          {/* auth */}
          <Route path="/" element={<InitialPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/guest" element={<GuestPage />} />
          <Route path="/onboarding" element={<OnboardingPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/simplelogin" element={<SimpleLoginAgreementPage />} />
          <Route path="/kakao/callback" element={<KakaoLoginCallback />} />
          <Route path="/google/callback" element={<GoogleLoginCallback />} />
          <Route element={<FindLayout />}>
            <Route path="/findpw" element={<FindPage />} />
            <Route
              path="/reset-password"
              element={
                <RequireFindAuth>
                  <ResetPassword />
                </RequireFindAuth>
              }
            />
          </Route>

          {/* settings */}
          <Route path="/settings" element={<SettingsLayout />}>
            <Route index element={<SettingsPage />} />
            <Route path="email" element={<EditEmailPage />} />
            <Route path="password" element={<EditPasswordPage />} />
            <Route element={<VerifyLayout />}>
              <Route
                path="password/verify"
                element={<EditPasswordEmailSection />}
              />
            </Route>
            <Route path="faq" element={<FaqPage />} />
            <Route path="notice" element={<NoticePage />} />
            <Route path=":agreementKey" element={<AgreementDetailPage />} />
            <Route path="withdraw" element={<WithdrawPage />} />
          </Route>
          <Route
            path="/settings/withdraw/done"
            element={<WithdrawDonePage />}
          />
          <Route path="/support" element={<SupportPage />} />

          {/* 탭바 있는 모든 페이지는 이 안에 */}
          <Route element={<Layout />}>
            {/* fridge & recipe */}
            <Route path="/fridge" element={<FridgePage />} />
            <Route path="/recipe" element={<RecipePage />}>
              <Route index element={<RecipeIntroPage />} />
              <Route path="select" element={<RecipeSelectPage />} />
              <Route path="confirm" element={<RecipeConfirmPage />} />
              <Route path="loading" element={<RecipeLoadingPage />} />
              <Route path="result" element={<RecipeResultPage />} />
              <Route path="result/:sessionId" element={<RecipeResultPage />} />
            </Route>
            <Route element={<AddItemLayout />}>
              <Route path="/fridge/add" element={<AddItemPage />} />
              <Route path="/fridge/add-detail" element={<Details />} />
            </Route>

            {/* cookeeps */}
            <Route path="/cookeeps" element={<CookeepsLayout />}>
              <Route index element={<CookeepsPage />} />
              <Route path="my-plant" element={<MyPlantPage />} />
              <Route path=":id" element={<RecipeDetailPage />} />

              {/* 리스트 전용 */}
              <Route element={<ListLayout />}>
                <Route
                  path="liked"
                  element={<ViewListPage type="좋아요 누른 레시피" />}
                />
                <Route
                  path="bookmarked"
                  element={<ViewListPage type="북마크한 레시피" />}
                />
                <Route path="all" element={<ViewAllPage />} />
              </Route>
            </Route>

            {/* MYCooKeep */}
            <Route path="/mycookeep" element={<MyCookeepPage />} />
            <Route path="/mycookeep/records" element={<RecordListPage />} />
          </Route>
          <Route path="/mycookeep/goals" element={<SetGoalPage />} />
          <Route
            path="/mycookeep/record/select"
            element={<RecordSelectPage />}
          />
          <Route path="/mycookeep/record/write" element={<RecordWritePage />} />
          <Route
            path="/mycookeep/record/:recordId"
            element={<RecordDetailPage />}
          />
          <Route
            path="/mycookeep/excluded-ingredients"
            element={<ExcludedIngredientPage />}
          />
        </Routes>
      </Suspense>
    </AppLayout>
  );
}
