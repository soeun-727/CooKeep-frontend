import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import AppLayout from "./layouts/AppLayout";

import InitialPage from "./pages/auth/InitialPage";
import OnboardingPage from "./pages/auth/OnboardingPage";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";
import FindPage from "./pages/auth/FindPage";
import ResetPassword from "./components/auth/find/ResetPassword";
import RequireFindAuth from "./components/auth/find/RequireFindAuth";
import FindLayout from "./components/auth/find/FindLayout";

import SettingsPage from "./pages/settings/SettingsPage";
import EditPhonePage from "./pages/settings/EditPhonePage";
import SettingsLayout from "./layouts/SettingsLayout";
import EditEmailPage from "./pages/settings/EditEmailPage";
import EditPasswordPage from "./pages/settings/EditPasswordPage";
import VerifyLayout from "./layouts/VerifyLayout";
import EditPasswordPhoneSection from "./components/settings/sections/EditPasswordPhoneSection";

import SimpleLoginAgreementPage from "./pages/auth/SimpleLoginAgreementPage";
import SupportPage from "./pages/settings/SupportPage";
import FaqPage from "./pages/settings/FaqPage";
import NoticePage from "./pages/settings/NoticePage";
import TermsPage from "./pages/settings/TermsPage";
import WithdrawPage from "./pages/settings/WithdrawPage";
import WithdrawDonePage from "./pages/settings/WithdrawDonePage";

import Layout from "./layouts/Layout";
import FridgePage from "./pages/fridge/FridgePage";
import AddItemPage from "./pages/fridge/AddItemPage";
import AddItemLayout from "./layouts/AddItemLayout";
import Details from "./components/fridge/addItems/Details";

import RecipePage from "./pages/recipe/RecipePage";
import RecipeIntroPage from "./pages/recipe/RecipeIntroPage";
import RecipeSelectPage from "./pages/recipe/RecipeSelectPage";
import RecipeConfirmPage from "./pages/recipe/RecipeConfirmPage";
import RecipeLoadingPage from "./pages/recipe/RecipeLoadingPage";
import RecipeResultPage from "./pages/recipe/RecipeResultPage";

import CookeepsPage from "./pages/cookeeps/CookeepsPage";
import MyPlantPage from "./pages/cookeeps/MyPlantPage";
import RecipeDetailPage from "./pages/cookeeps/RecipeDetailPage";
import ListLayout from "./layouts/ListLayout";
import ViewListPage from "./pages/cookeeps/ViewListPage";
import ViewAllPage from "./pages/cookeeps/ViewAllPage";
import CookeepsLayout from "./layouts/CookeepsLayout";

import MyCookeepPage from "./pages/myCookeep/MyCookeepPage";
import SetGoalPage from "./pages/myCookeep/SetGoalPage";
import RecordSelectPage from "./pages/myCookeep/RecordSelectPage";
import RecordWritePage from "./pages/myCookeep/RecordWritePage";
import RecordDetailPage from "./pages/myCookeep/RecordDetailPage";
import KakaoLoginCallback from "./components/auth/simplelogin/KakaoLoginCallback";
import GoogleLoginCallback from "./components/auth/simplelogin/GoogleLoginCallback";
import GuestPage from "./pages/auth/GuestPage";
import { useAuthStore } from "./stores/useAuthStore";
import { useEffect, useState } from "react";
import SplashPage from "./pages/SplashPage";
import { useThemeColor } from "./hooks/useThemeColor";

export default function App() {
  useThemeColor("#FAFAFA");
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
      }, 5500);
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

  // GA tracking 페이지 이동 추적
  useEffect(() => {
    if (!window.gtag) return;

    window.gtag("config", "G-RT9D555519", {
      page_path: location.pathname + location.search,
    });
  }, [location.pathname, location.search]);

  if (showSplash && !isCallback) {
    return <SplashPage />;
  }

  return (
    <AppLayout>
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
          <Route path="phone" element={<EditPhonePage />} />
          <Route path="email" element={<EditEmailPage />} />
          <Route path="password" element={<EditPasswordPage />} />
          <Route element={<VerifyLayout />}>
            <Route
              path="password/verify"
              element={<EditPasswordPhoneSection />}
            />
          </Route>
          <Route path="faq" element={<FaqPage />} />
          <Route path="notice" element={<NoticePage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="withdraw" element={<WithdrawPage />} />
        </Route>
        <Route path="/settings/withdraw/done" element={<WithdrawDonePage />} />
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
        </Route>
        <Route path="/mycookeep/goals" element={<SetGoalPage />} />
        <Route path="/mycookeep/record/select" element={<RecordSelectPage />} />
        <Route path="/mycookeep/record/write" element={<RecordWritePage />} />
        <Route
          path="/mycookeep/record/:recordId"
          element={<RecordDetailPage />}
        />
      </Routes>
    </AppLayout>
  );
}
