import { Container, Alert } from "@mui/material";

interface ErrorMessageProps {
  error: string;
}

export const ErrorMessage = ({ error }: ErrorMessageProps) => (
  <Container sx={{ mb: 4 }}>
    <Alert severity="error">{error}</Alert>
  </Container>
);
