import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome back to a smarter fleet system."
      description="Access transport requests, approvals, allocation workflows, and AI-supported fleet decisions through one secure platform."
    >
      <LoginForm />
    </AuthShell>
  );
}