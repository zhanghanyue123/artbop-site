import AuthShell from "../../components/AuthShell";

export const metadata = {
  title: "注册",
  robots: { index: false, follow: false },
};

export default function RegisterPage() {
  return <AuthShell mode="register" />;
}
