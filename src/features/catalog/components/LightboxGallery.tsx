import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { IPhoto } from "../../../shared/interfaces";
import { getReliableImageUrl } from "../../../shared/utils/imageHelpers";

interface LightboxGalleryProps {
  photos: IPhoto[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex: number;
}

export const LightboxGallery = ({
  photos,
  isOpen,
  onClose,
  initialIndex,
}: LightboxGalleryProps) => {
  const slides = photos.map((photo) => ({
    src: getReliableImageUrl(photo.id),
    alt: photo.title,
  }));

  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      slides={slides}
      index={initialIndex}
      carousel={{ finite: false }}
    />
  );
};
