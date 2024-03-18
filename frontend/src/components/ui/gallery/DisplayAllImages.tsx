import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Button } from "@/components/ui/button.tsx";

function DisplayAllImages({ userName, images, onClose }) {
  console.log("images", images)
  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogTrigger asChild className="bg-transparent text-green-600">
        <Button>Afficher la galerie</Button>
      </DialogTrigger>
      <DialogContent className="w-full bg-blue-900">
        <DialogHeader>
          <DialogTitle className="mb-5 text-white text-center text-2xl">
            Gallerie photo de {userName}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col">
          {images && images.map((image, index) => (
            <div className="flex flex-col items-center gap-4">
              <p className="text-white mt-3">{image.title}</p>
              <img key={index} src={`${import.meta.env.VITE_BACKEND_URL}/${userName}/${image.imageName}`} alt={`Image ${index}`} />
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose
            onClick={onClose}
            className="w-full h-10 rounded-md bg-red-400 text-white"
          >
            Fermer
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


export default DisplayAllImages;