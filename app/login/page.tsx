import AuthShell from "../../components/AuthShell";

export const metadata = {
  title: "登录",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <AuthShell mode="login" />;
}
