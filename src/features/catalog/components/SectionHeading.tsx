import { Box, Typography } from "@mui/material";

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  light?: boolean;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  light = false,
}: SectionHeadingProps) {
  return (
    <Box sx={{ mb: { xs: 3, md: 4 } }}>
      <Typography
        variant="overline"
        sx={{
          color: light ? "primary.light" : "primary.main",
          display: "block",
          mb: 1,
        }}
      >
        {label}
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: subtitle ? 1.5 : 0,
        }}
      >
        <Typography
          variant="h3"
          component="h2"
          sx={{
            color: light ? "common.white" : "text.primary",
            fontSize: { xs: "1.75rem", md: "2.25rem" },
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            flex: 1,
            height: 2,
            borderRadius: 1,
            background: light
              ? "linear-gradient(90deg, rgba(196,169,98,0.8), transparent)"
              : "linear-gradient(90deg, rgba(196,169,98,0.6), transparent)",
          }}
        />
      </Box>

      {subtitle && (
        <Typography
          variant="body1"
          sx={{
            color: light ? "rgba(255,255,255,0.65)" : "text.secondary",
            maxWidth: 520,
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
