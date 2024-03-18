import { useState } from "react";
import { CarouselItem } from "@/components/ui/carousel";
import DisplayAllImages from "./DisplayAllImages";

function DisplayOneImage({ id, userName, imageName, title, allImages }) {
  const [showGallery, setShowGallery] = useState(false);

  const handleGalleryOpen = () => {
    setShowGallery(true);
  };

  const handleGalleryClose = () => {
    setShowGallery(false);
  };

  console.log("allImage", allImages)

  return (
    <>
      <CarouselItem onClick={handleGalleryOpen}>
        <div className="mb-2 text-center text-white">Galerie de {userName}</div>
        <img src={`${import.meta.env.VITE_BACKEND_URL}/${userName}/${imageName}`} alt={title} />
      </CarouselItem>
      {showGallery && (
        <DisplayAllImages
          userName={userName}
          images={allImages}
          onClose={handleGalleryClose}
          title={title} // Passer le titre de l'image si nécessaire
        />
      )}
    </>
  );
}

export default DisplayOneImage;