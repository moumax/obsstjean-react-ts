import { CarouselItem } from "@/components/ui/carousel";
import CardPhotos from "../ui/CardPhotos";
import useSWR from "swr";
import callAPI from "@/api/callAPI";
import { useEffect, useState } from "react";

interface PhotosGalleryProps {
  name: string;
}

function PhotosGallery({ name }: PhotosGalleryProps) {
  const { data: responseData, error: errorFolders, isLoading: isLoadingFolders } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/user-images/${name}`, callAPI);
  const [userImages, setUserImages] = useState<string[]>([]);

  useEffect(() => {
    if (responseData) {
      const images = responseData.images;
      const randomImageIndex = Math.floor(Math.random() * images.length);
      setUserImages([images[randomImageIndex]]);
    }
  }, [responseData]);

  if (errorFolders) return `Erreur lors du chargement : ${errorFolders.message}`;
  if (isLoadingFolders) return "chargement en cours...";

  return (
    <>
      <CarouselItem>
        <div className="text-white text-center mb-2">Gallerie de {name}</div>
        <div className="flex flex-row" key={name}>
          {userImages.map((imageUrl, index) => (
              <img key={index} src={imageUrl} alt={`Photo ${index}`} />
          ))}
        </div>
        <CardPhotos name={name} />
      </CarouselItem>
    </>
  );
}

export default PhotosGallery;
