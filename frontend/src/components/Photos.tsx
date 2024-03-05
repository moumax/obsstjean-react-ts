import callAPI from "@/api/callAPI";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import useSWR from "swr";
import PhotosGallery from "./ui/PhotosGallery";

function Photos() {

  const {
    data: responseData,
    error: errorFolders,
    isLoading: isLoadingFolders,
  }  = useSWR(`${import.meta.env.VITE_BACKEND_URL}/folderNames/`, callAPI);
  
  if (errorFolders) return `Erreur lors du chargement : ${errorFolders.message}`;
  if (isLoadingFolders) return "chargement en cours...";

  // Extract the folderNames array from the responseData object
  const { folderNames } = responseData;

  console.log("folderName", folderNames);
  
  return (
    <section className="flex justify-center items-center">
      <Carousel className="w-[70%]">
        <CarouselContent>
          {folderNames.map(name => (
          <PhotosGallery name={name} />
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  );
}

export default Photos;
