import AuthHeader from "../AuthHeader";
import LoginMain from "./LoginMain";

export default function Login() {
  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex flex-1 flex-col gap-30 px-4">
        <AuthHeader />

        <LoginMain />
      </main>
    </div>
  );
}
