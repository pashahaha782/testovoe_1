import { Alert, Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { register as registerAction } from "../../../shared/stores/userStore.ts";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../shared/routes/routes.ts";

const registerSchema = yup.object({
  email: yup.string().email("Неверный email").required("Email обязателен"),
  password: yup
    .string()
    .min(6, "Пароль должен быть не менее 6 символов")
    .required("Пароль обязателен"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Пароли не совпадают")
    .required("Подтверждение пароля обязательно"),
});

type RegisterFormData = yup.InferType<typeof registerSchema>;

export function RegisterForm() {
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setSubmitError("");
    setLoading(true);

    try {
      const success = await registerAction(data.email, data.password);

      if (success) {
        navigate(ROUTES.HOME);
        return;
      }

      setSubmitError("Пользователь с таким email уже существует");
    } catch {
      setSubmitError("Произошла ошибка при регистрации");
    } finally {
      setLoading(false);
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

      <TextField
        fullWidth
        label="Подтверждение пароля"
        type="password"
        {...register("confirmPassword")}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword?.message}
        disabled={loading}
      />

      {submitError && <Alert severity="error">{submitError}</Alert>}

      <Button type="submit" variant="contained" fullWidth disabled={loading}>
        {loading ? "Загрузка..." : "Зарегистрироваться"}
      </Button>
    </Box>
  );
}
