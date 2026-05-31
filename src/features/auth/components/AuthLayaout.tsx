import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography,
  Container,
  Box,
} from "@mui/material";

interface AuthLayoutProps {
  form: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  footerText?: React.ReactNode;
}

export function AuthLayout({
  form,
  title,
  description,
  footerText,
}: AuthLayoutProps) {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 2, sm: 3 },
      }}
    >
      <Container maxWidth="sm">
        <Card sx={{ width: "100%" }}>
          <CardHeader
            title={
              <Typography
                variant="h5"
                component="h1"
                align="center"
                gutterBottom
              >
                {title}
              </Typography>
            }
            subheader={
              description && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  align="center"
                >
                  {description}
                </Typography>
              )
            }
          />
          <CardContent>{form}</CardContent>
          {footerText && (
            <CardActions sx={{ justifyContent: "center", pb: 3, pt: 0 }}>
              <Typography
                variant="body2"
                color="text.secondary"
                align="center"
                sx={{
                  "& a": {
                    color: "primary.main",
                    textDecoration: "underline",
                  },
                }}
              >
                {footerText}
              </Typography>
            </CardActions>
          )}
        </Card>
      </Container>
    </Box>
  );
}
