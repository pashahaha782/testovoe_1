import { Box, Typography, Link, Toolbar } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "background.default",
        borderTop: "1px solid",
        borderColor: "divider",
        mt: "auto",
        width: "100%",
      }}
    >
      <Toolbar
        sx={{
          maxWidth: "1200px",
          width: "100%",
          mx: "auto",
          px: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} PhotoSphere
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link
            href="tel:+71234567890"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "text.secondary",
              textDecoration: "none",
              "&:hover": { color: "primary.main" },
            }}
          >
            <PhoneIcon fontSize="small" />
            <Typography
              variant="body2"
              sx={{
                display: { xs: "none", md: "inline" },
              }}
            >
              +7 (123) 456-78-90
            </Typography>
          </Link>

          <Link
            href="mailto:info@photosphere.com"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "text.secondary",
              textDecoration: "none",
              "&:hover": { color: "primary.main" },
            }}
          >
            <EmailIcon fontSize="small" />
            <Typography
              variant="body2"
              sx={{
                display: { xs: "none", md: "inline" },
              }}
            >
              info@photosphere.com
            </Typography>
          </Link>

          <Link
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: "text.secondary",
              textDecoration: "none",
              "&:hover": { color: "primary.main" },
            }}
          >
            <GitHubIcon fontSize="small" />
            <Typography
              variant="body2"
              sx={{
                display: { xs: "none", md: "inline" },
              }}
            >
              GitHub
            </Typography>
          </Link>
        </Box>
      </Toolbar>
    </Box>
  );
}
