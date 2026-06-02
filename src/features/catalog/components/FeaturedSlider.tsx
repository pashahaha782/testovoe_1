import { useRef, useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { PhotoCard } from "./PhotoCard";
import type { Photo } from "../../../shared/interfaces";

interface FeaturedSliderProps {
  photos: Photo[];
  title: string;
  onPhotoClick: (index: number) => void;
}

export const FeaturedSlider = ({
  photos,
  title,
  onPhotoClick,
}: FeaturedSliderProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const featuredRef = useRef<HTMLElement>(null);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });

      setTimeout(checkScrollButtons, 300);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    window.addEventListener("resize", checkScrollButtons);
    return () => window.removeEventListener("resize", checkScrollButtons);
  }, [photos]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollButtons);
      return () => container.removeEventListener("scroll", checkScrollButtons);
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      container.scrollBy({
        left: e.deltaY > 0 ? 100 : -100,
        behavior: "smooth",
      });
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <Box
      component="section"
      sx={{ mb: 4, position: "relative", scrollMarginTop: "64px" }}
      ref={featuredRef}
      id="featured"
    >
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ fontWeight: 600, mb: 3, textAlign: "center" }}
      >
        {title}
      </Typography>

      {showLeftButton && (
        <IconButton
          onClick={() => scroll("left")}
          sx={{
            position: "absolute",
            left: -20,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            backgroundColor: "background.paper",
            boxShadow: 3,
            "&:hover": { backgroundColor: "primary.main", color: "white" },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
      )}

      <Box
        ref={scrollContainerRef}
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
          pb: 2,
          "&::-webkit-scrollbar": { height: 8 },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "background.paper",
            borderRadius: 4,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "primary.main",
            borderRadius: 4,
          },
        }}
      >
        {photos.map((photo, index) => (
          <Box
            key={photo.id}
            onClick={() => onPhotoClick(index)}
            sx={{
              flex: "0 0 auto",
              width: {
                xs: "100%",
                sm: "calc(50% - 16px)",
                md: "calc(33.333% - 16px)",
              },
              scrollSnapAlign: "start",
              cursor: "pointer",
              transition: "transform 0.3s ease",
              "&:hover": { transform: "scale(1.02)" },
            }}
          >
            <PhotoCard photo={photo} />
          </Box>
        ))}
      </Box>

      {showRightButton && (
        <IconButton
          onClick={() => scroll("right")}
          sx={{
            position: "absolute",
            right: -20,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 2,
            backgroundColor: "background.paper",
            boxShadow: 3,
            "&:hover": { backgroundColor: "primary.main", color: "white" },
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      )}
    </Box>
  );
};
