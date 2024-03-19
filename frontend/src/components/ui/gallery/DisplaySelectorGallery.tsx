import callAPI from "@/api/callAPI";
import useSWR from "swr";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import DisplayOneImage from "./DisplayOneImage";

interface ImageData {
  imagePath: string;
  imageName: string;
  description: string;
  title: string;
}

const DisplaySelectorGallery = () => {
  const {
    data: responseData,
    error: fetchError,
    isLoading: isLoadingData,
  } = useSWR<ImageData[]>(`${import.meta.env.VITE_BACKEND_URL}/api/gallery/`, callAPI);

  const [randomImages, setRandomImages] = useState<ImageData[]>([]);
  const [imagesByUser, setImagesByUser] = useState<Record<string, ImageData[]>>({});

  useEffect(() => {
    if (responseData) {
      const images: Record<string, ImageData[]> = {};
      responseData.forEach((image) => {
        const userName = extractUserName(image.imagePath);
        if (!images[userName]) {
          images[userName] = [];
        }
        images[userName].push(image);
      });
      setImagesByUser(images);

      const randomImagesArray: ImageData[] = [];
      Object.values(images).forEach(userImages => {
        const nonOriginalImages = userImages.filter(image => !image.imageName.startsWith("original_"));
        if (nonOriginalImages.length > 0) {
          const randomIndex = Math.floor(Math.random() * nonOriginalImages.length);
          randomImagesArray.push(nonOriginalImages[randomIndex]);
        }
      });
      setRandomImages(randomImagesArray);
    }
  }, [responseData]);

  const extractUserName = (path: string) => {
    const parts = path.split("/");
    return parts[parts.length - 2];
  };

  if (fetchError) {
    console.error("Erreur lors de la récupération des données :", fetchError);
    return <div>Erreur lors de la récupération des données</div>;
  }

  if (isLoadingData) {
    return <div>Chargement...</div>;
  }

  return (
    <section className="flex items-center justify-center">
      <Carousel className="w-[70%]">
        <CarouselContent>
          {randomImages
            .filter(image => !image.imageName.startsWith("original_"))
            .map((image, index) => (
              <DisplayOneImage
                key={index}
                id={index}
                allImages={imagesByUser[extractUserName(image.imagePath)].filter(image => !image.imageName.startsWith("original_"))}
                imageName={image.imageName}
                userName={extractUserName(image.imagePath)}
                description={image.description}
                title="Titre de l'image"
              />
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
};

export default DisplaySelectorGallery;