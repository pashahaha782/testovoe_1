import { useRef, useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { PhotoCard } from "./PhotoCard";
import { SectionHeading } from "./SectionHeading";
import type { IPhoto } from "../../../shared/interfaces";

interface FeaturedSliderProps {
  photos: IPhoto[];
  title: string;
  subtitle?: string;
  onPhotoClick: (index: number) => void;
}

export const FeaturedSlider = ({
  photos,
  title,
  subtitle,
  onPhotoClick,
}: FeaturedSliderProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

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
      const scrollAmount = 320;
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
      sx={{
        position: "relative",
        scrollMarginTop: "80px",
        py: { xs: 5, md: 7 },
        px: { xs: 2, md: 4 },
        mx: { xs: -2, sm: 0 },
        mb: { xs: 5, md: 8 },
        borderRadius: { sm: 4 },
        background:
          "linear-gradient(145deg, #141414 0%, #1f1f1f 55%, #2a2418 100%)",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: -120,
          right: -80,
          width: 320,
          height: 320,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(196,169,98,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        },
      }}
      id="featured"
    >
      <SectionHeading
        label="Избранное"
        title={title}
        subtitle={subtitle ?? "Лучшие работы, отобранные редакцией PhotoSphere"}
        light
      />

      {showLeftButton && (
        <IconButton
          onClick={() => scroll("left")}
          aria-label="Прокрутить влево"
          sx={{
            position: "absolute",
            left: { xs: 8, md: 16 },
            top: "58%",
            transform: "translateY(-50%)",
            zIndex: 2,
            backgroundColor: "rgba(255,255,255,0.12)",
            color: "common.white",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.12)",
            "&:hover": {
              backgroundColor: "primary.main",
              color: "primary.contrastText",
            },
          }}
        >
          <ChevronLeftIcon />
        </IconButton>
      )}

      <Box
        ref={scrollContainerRef}
        sx={{
          display: "flex",
          gap: 2.5,
          overflowX: "auto",
          overflowY: "hidden",
          scrollSnapType: "x mandatory",
          pb: 1,
          mx: -0.5,
          px: 0.5,
          "&::-webkit-scrollbar": { height: 6 },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "rgba(255,255,255,0.06)",
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
            sx={{
              flex: "0 0 auto",
              width: {
                xs: "85%",
                sm: "55%",
                md: "calc(40% - 12px)",
                lg: "calc(32% - 12px)",
              },
              scrollSnapAlign: "start",
            }}
          >
            <PhotoCard photo={photo} onClick={() => onPhotoClick(index)} />
          </Box>
        ))}
      </Box>

      {showRightButton && (
        <IconButton
          onClick={() => scroll("right")}
          aria-label="Прокрутить вправо"
          sx={{
            position: "absolute",
            right: { xs: 8, md: 16 },
            top: "58%",
            transform: "translateY(-50%)",
            zIndex: 2,
            backgroundColor: "rgba(255,255,255,0.12)",
            color: "common.white",
            backdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.12)",
            "&:hover": {
              backgroundColor: "primary.main",
              color: "primary.contrastText",
            },
          }}
        >
          <ChevronRightIcon />
        </IconButton>
      )}
    </Box>
  );
};
