import AuthHeader from "../AuthHeader";
import LoginMain from "./LoginMain";

export default function Login() {
  return (
    <div className="flex min-h-dvh flex-col">
      <AuthHeader />

      <main className="flex flex-1 flex-col px-4 pt-[160px]">
        <LoginMain />
      </main>
    </div>
  );
}
