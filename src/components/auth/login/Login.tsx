import AuthHeader from "../AuthHeader";
import LoginFooter from "./LoginFooter";
import LoginMain from "./LoginMain";

export default function Login() {
  return (
    <div className="min-h-screen">
      <AuthHeader />
      <LoginMain />
      <LoginFooter />
    </div>
  );
}
