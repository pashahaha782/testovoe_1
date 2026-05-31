import { Alert, Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { login } from "../../../shared/stores/userStore.ts";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../shared/routes/routes.ts";

const loginSchema = yup.object({
  email: yup.string().email("Неверный email").required("Email обязателен"),
  password: yup
    .string()
    .min(6, "Пароль должен быть не менее 6 символов")
    .required("Пароль обязателен"),
});

type LoginFormData = yup.InferType<typeof loginSchema>;

export function LoginForm() {
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setSubmitError("");
    setLoading(true);

    try {
      const success = await login(data.email, data.password);

      if (success) {
        navigate(ROUTES.HOME);
        return;
      }

      setSubmitError("Неверный email или пароль");
    } catch {
      setSubmitError("Произошла ошибка при входе");
    } finally {
      setLoading(false); // 👈 finally гарантирует снятие загрузки
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        fullWidth
        label="Email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        disabled={loading}
      />

      <TextField
        fullWidth
        label="Пароль"
        type="password"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        disabled={loading}
      />

      {submitError && <Alert severity="error">{submitError}</Alert>}

      <Button type="submit" variant="contained" fullWidth disabled={loading}>
        {loading ? "Загрузка..." : "Войти"}
      </Button>
    </Box>
  );
}
