import callAPI from "@/api/callAPI";
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
import { useState } from "react";
import useSWR from "swr";

interface CardPhotosProps {
  name: string;
}

const CardPhotos = ({ name }: CardPhotosProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const { data: responseData, error: errorFolders, isLoading: isLoadingFolders } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/user-images/${name}`, callAPI);

  const displayImages = () => {
    if (responseData && responseData.images) {
      return responseData.images.map((imageUrl, index) => (
        <img key={index} src={imageUrl} alt={`Image ${index}`} />
      ));
    }
    return null;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="bg-transparent text-green-600">
        <Button onClick={handleOpen}>Afficher la galerie</Button>
      </DialogTrigger>
      <DialogContent className="bg-blue-900 w-full">
        <DialogHeader>
          <DialogTitle className="text-white mb-5">Gallerie photo de {name}</DialogTitle>
          <DialogDescription className="text-white">
            {isLoadingFolders ? (
              <p>Chargement en cours...</p>
            ) : errorFolders ? (
              <p>Erreur lors du chargement : {errorFolders.message}</p>
            ) : (
              <div>{displayImages()}</div>
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose className="h-10 rounded-md bg-red-400 text-white">Annuler</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CardPhotos;
