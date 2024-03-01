import { CarouselItem } from "@/components/ui/carousel";
import CardPhotos from "../ui/CardPhotos";

interface PhotosGalleryProps {
  name: string;
}

function PhotosGallery({ name }: PhotosGalleryProps) {
  return (
    <>
      <CarouselItem>
        <div className="text-white text-center mb-2">Gallerie de {name}</div>
        <div className="flex flex-row" key={name}>
          <img src={`/Photos/${name}/photo001Full.jpg`} alt={`${name} Photo`} />
        </div>
        <CardPhotos name={name} />
      </CarouselItem>
    </>
  );
}

export default PhotosGallery;
