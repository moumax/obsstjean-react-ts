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

function DisplayAllImages({ userName, images, onClose, description }) {
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
          {images &&
            images.map((image, index) => (
              <div className="relative mb-2" key={index}>
                <a href={`${import.meta.env.VITE_BACKEND_URL}/${userName}/${image.imageName}`} target="_blank">
                  <img src={`${import.meta.env.VITE_BACKEND_URL}/${userName}/${image.imageName}`} alt={`Image ${index}`} />
                </a>
                <div className="absolute top-0 right-0 px-2  text-yellow-300 opacity-70">
                  <p className="">{image.title}</p>
                </div>
                <div className="w-full absolute bottom-0 left-0 px-2 text-white opacity-70 text-xs">
                  <p className="mt-3" style={{ wordWrap: 'break-word' }}>{image.description}</p>
                </div>
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