import { CarouselItem } from "@/components/ui/carousel";
import CardPhotos from "../ui/CardPhotos";
import useSWR from "swr";
import callAPI from "@/api/callAPI";
import { useEffect, useState } from "react";

interface PhotosGalleryCarouselProps {
  folderName: string;
}

// Take an image randomly on user folder to display it to introduce the gallery

function PhotosGalleryCarousel({ folderName }: PhotosGalleryCarouselProps) {
  const { data: data, error: error, isLoading: isLoading } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/api/gallery/${folderName}`, callAPI);
  const [userImages, setUserImages] = useState<string[]>([]);

  useEffect(() => {
    // List images and return a random image to display
    if (data) {
      const allImages = data.images;
      const randomImageIndex = Math.floor(Math.random() * allImages.length);
      setUserImages([allImages[randomImageIndex]]);
    }
  }, [data]);

  return (
    <>
      <CarouselItem>
        <div className="text-white text-center mb-2">Galerie de {folderName}</div>
        <div className="flex flex-row" key={folderName}>
          {isLoading ? (
            <p>Chargement en cours...</p>
          ) : error ? (
            <p>Erreur lors du chargement : {error.message}</p>
          ) : (
            userImages.map((imageUrl, index) => (
              <img key={index} src={imageUrl} alt={`Photo ${index}`} />
            ))
          )}
        </div>
        <CardPhotos folderName={folderName} />
      </CarouselItem>
    </>
  );
}

export default PhotosGalleryCarousel;
