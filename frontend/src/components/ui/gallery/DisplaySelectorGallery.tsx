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

const DisplaySelectorGallery = () => {
  const {
    data: responseData,
    error: fetchError,
    isLoading: isLoadingData,
  } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/api/gallery/`, callAPI);

  const [randomImages, setRandomImages] = useState([]);
  const [imagesByUser, setImagesByUser] = useState({});

  useEffect(() => {
    if (responseData) {
      const images = {};
      responseData.forEach((image) => {
        const userName = extractUserName(image.imagePath);
        if (!images[userName]) {
          images[userName] = [];
        }
        images[userName].push(image);
      });
      setImagesByUser(images);

      const randomImagesArray = Object.values(images).map((images) => {
        const randomIndex = Math.floor(Math.random() * images.length);
        return images[randomIndex];
      });
      setRandomImages(randomImagesArray);
    }
  }, [responseData]);

  const extractUserName = (path) => {
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
          {randomImages.map((image, index) => (
            <DisplayOneImage
              key={index}
              allImages={imagesByUser[extractUserName(image.imagePath)]}
              imageName={image.imageName}
              userName={extractUserName(image.imagePath)}
              description={image.description}
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