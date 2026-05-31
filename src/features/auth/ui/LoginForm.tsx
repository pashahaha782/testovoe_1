import { Alert, Box, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { login } from "../../../shared/stores/authStore.ts";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const success = await login(email, password);

    if (!success) {
      setError("Неверный email или пароль");
    }

    setLoading(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        fullWidth
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        required
      />

      <TextField
        fullWidth
        label="Пароль"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
        required
      />

      {error && <Alert severity="error">{error}</Alert>}

      <Button type="submit" variant="contained" fullWidth disabled={loading}>
        {loading ? "Загрузка..." : "Войти"}
      </Button>
    </Box>
  );
}
