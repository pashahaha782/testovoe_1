import { Link } from "react-router-dom";
import { ROUTES } from "../../../shared/routes/routes.ts";
import { AuthLayout } from "../ui/AuthLayaout.tsx";
import { RegisterForm } from "../ui/RegisterForm.tsx";

export function RegisterPage() {
  return (
    <AuthLayout
      form={<RegisterForm />}
      title="Вход в систему"
      description="Введите ваш email и пароль для регистрации в системe"
      footerText={
        <span>
          Уже есть аккаунта? <Link to={ROUTES.LOGIN}>Войти</Link>
        </span>
      }
    />
  );
}

export const Component = RegisterPage;
