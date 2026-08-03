import PasswordRecoveryShell from "../../components/PasswordRecoveryShell";

export const metadata = {
  title: "找回密码",
  robots: { index: false, follow: false },
};

export default function ForgotPasswordPage() {
  return <PasswordRecoveryShell mode="request" />;
}
