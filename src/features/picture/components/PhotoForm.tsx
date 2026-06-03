import { Alert, Box, Button, Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import type { IPhotoInput } from "../../../shared/interfaces";

const photoSchema = yup.object({
  title: yup
    .string()
    .trim()
    .min(3, "Название должно быть не короче 3 символов")
    .required("Название обязательно"),
  description: yup
    .string()
    .trim()
    .min(10, "Описание должно быть не короче 10 символов")
    .required("Описание обязательно"),
  author: yup
    .string()
    .trim()
    .min(2, "Имя автора должно быть не короче 2 символов")
    .required("Автор обязателен"),
});

type PhotoFormData = yup.InferType<typeof photoSchema>;

interface PhotoFormProps {
  defaultValues?: PhotoFormData;
  submitLabel: string;
  onSubmit: (data: IPhotoInput) => Promise<boolean>;
  onCancel: () => void;
}

export function PhotoForm({
  defaultValues,
  submitLabel,
  onSubmit,
  onCancel,
}: PhotoFormProps) {
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PhotoFormData>({
    resolver: yupResolver(photoSchema),
    defaultValues: defaultValues ?? {
      title: "",
      description: "",
      author: "",
    },
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  const handleFormSubmit = async (data: PhotoFormData) => {
    setSubmitError("");
    setLoading(true);

    try {
      const success = await onSubmit({
        title: data.title.trim(),
        description: data.description.trim(),
        author: data.author.trim(),
      });

      if (!success) {
        setSubmitError("Не удалось сохранить публикацию");
      }
    } catch {
      setSubmitError("Произошла ошибка при сохранении");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
    >
      <TextField
        fullWidth
        label="Название"
        {...register("title")}
        error={!!errors.title}
        helperText={errors.title?.message}
        disabled={loading}
      />

      <TextField
        fullWidth
        label="Описание"
        multiline
        minRows={4}
        {...register("description")}
        error={!!errors.description}
        helperText={errors.description?.message}
        disabled={loading}
      />

      <TextField
        fullWidth
        label="Автор"
        {...register("author")}
        error={!!errors.author}
        helperText={errors.author?.message}
        disabled={loading}
      />

      {submitError && <Alert severity="error">{submitError}</Alert>}

      <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
        <Button type="submit" variant="contained" disabled={loading}>
          {loading ? "Сохранение..." : submitLabel}
        </Button>
        <Button variant="outlined" onClick={onCancel} disabled={loading}>
          Отмена
        </Button>
      </Stack>
    </Box>
  );
}
