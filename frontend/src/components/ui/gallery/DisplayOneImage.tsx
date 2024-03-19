import { useState } from "react";
import { CarouselItem } from "@/components/ui/carousel";
import DisplayAllImages from "./DisplayAllImages";

interface Image {
  imageName: string;
  title: string;
  description: string;
}

interface DisplayOneImageProps {
  id: number;
  userName: string;
  imageName: string;
  title: string;
  description: string;
  allImages: Image[];
}

function DisplayOneImage(props: DisplayOneImageProps) {
  const [showGallery, setShowGallery] = useState(false);

  const handleGalleryOpen = () => {
    setShowGallery(true);
  };

  const handleGalleryClose = () => {
    setShowGallery(false);
  };

  return (
    <>
      <CarouselItem onClick={handleGalleryOpen}>
        <div className="mb-2 text-center text-white">Galerie de {props.userName}</div>
        <img src={`${import.meta.env.VITE_BACKEND_URL}/${props.userName}/${props.imageName}`} alt={props.title} />
      </CarouselItem>
      {showGallery && (
        <DisplayAllImages
          userName={props.userName}
          images={props.allImages}
          onClose={handleGalleryClose}
          title={props.title}
          description={props.description}
        />
      )}
    </>
  );
}

export default DisplayOneImage;