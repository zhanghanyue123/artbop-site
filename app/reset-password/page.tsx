import PasswordRecoveryShell from "../../components/PasswordRecoveryShell";

export const metadata = {
  title: "设置新密码",
  robots: { index: false, follow: false },
};

export default function ResetPasswordPage() {
  return <PasswordRecoveryShell mode="reset" />;
}
