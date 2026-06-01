const LOCAL_IMAGES = [
  "/photos/photo1.jpg",
  "/photos/photo2.jpg",
  "/photos/photo3.jpg",
  "/photos/photo4.jpg",
  "/photos/photo5.jpg",
  "/photos/photo6.jpg",
  "/photos/photo7.jpg",
  "/photos/photo8.jpg",
  "/photos/photo9.jpg",
  "/photos/photo10.jpg",
  "/photos/photo11.jpg",
  "/photos/photo12.jpg",
];

export const getReliableImageUrl = (photoId: number): string => {
  const index = (photoId - 1) % LOCAL_IMAGES.length;
  return LOCAL_IMAGES[index];
};
