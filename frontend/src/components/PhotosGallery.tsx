import callAPI from "@/api/callAPI";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import useSWR from "swr";
import PhotosGalleryCarousel from "./ui/PhotosGalleryCarousel";

// Iterate on folder photos to extract the users names created on signup

function PhotosGallery() {
  const {
    data: data,
    error: error,
    isLoading: isLoading,
  } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/api/foldersname/`, callAPI);

  const folderNames = data?.folderNames || [];

  return (
    <section className="flex justify-center items-center">
      <Carousel className="w-[70%]">
        <CarouselContent>
          {isLoading ? (
            <p>Chargement en cours...</p>
          ) : error ? (
            <p>Erreur lors du chargement : {error.message}</p>
          ) : (
            folderNames.map((folderName: string, index: number) => (
              <PhotosGalleryCarousel key={index} folderName={folderName} />
            ))
          )}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}

export default PhotosGallery;
