import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { useState, useEffect } from "react";

interface CardPhotosProps {
  name: string;
}

function CardPhotos({ name }: CardPhotosProps) {
  const [open, setOpen] = useState(false);
  const [gallery, setGallery] = useState<string[]>([]);

  useEffect(() => {
    const loadAllImages = async () => {
      const imageContext = await import.meta.glob(`../../../public/Photos/*/*.{jpg,jpeg}`);
      const imageKeys = Object.keys(imageContext);
      setGallery(imageKeys);
    };

    loadAllImages();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  console.log(gallery)
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="bg-transparent text-green-600">
        <Button onClick={handleOpen}>
          Afficher la galerie
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-blue-900 w-full">
        <DialogHeader>
          <DialogTitle className="text-white mb-5">
            Gallerie photo de {name}
          </DialogTitle>
          <DialogDescription className="text-white">
            <div>
              {gallery.filter(image => image.startsWith(`../../../public/Photos/${name}/`)).map((image, index) => (
                <a key={index} href={image} target="_blank">
                  <img src={image} className="rounded-md mb-2" alt={`Photo ${index}`} />
                  Texte de la photo
                </a>
              ))}
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose className="h-10 rounded-md bg-red-400 text-white">
            Annuler
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CardPhotos;
