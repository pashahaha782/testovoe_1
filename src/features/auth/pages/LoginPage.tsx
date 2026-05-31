import { Link } from "react-router-dom";
import { ROUTES } from "../../../shared/routes/routes.ts";
import { AuthLayout } from "../components/AuthLayaout.tsx";
import { LoginForm } from "../components/LoginForm.tsx";

export function LoginPage() {
  return (
    <AuthLayout
      form={<LoginForm />}
      title="Вход в систему"
      description="Введите ваш email и пароль для входа в систему"
      footerText={
        <span>
          Нет аккаунта? <Link to={ROUTES.REGISTER}>Зарегестрироваться</Link>
        </span>
      }
    />
  );
}

export const Component = LoginPage;
