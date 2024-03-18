import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog.tsx";
import { Trash2 } from "lucide-react";
import { mutate } from "swr";
import { useToast } from "../../../ui/use-toast";

interface DeletePhotoProps {
  id: number;
  name: string;
  username: string;
}

function DeletePhoto(props: DeletePhotoProps) {
  const { toast } = useToast();

  const handleDelete = async (photoId: number) => {
    try {
      await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/gallery/${photoId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      toast({
        description: `Photo correctement supprimé de la base de données !`,
      });
      mutate(`${import.meta.env.VITE_BACKEND_URL}/api/gallery/${props.username}`);
    } catch (error) {
      console.error("Erreur lors de la suppression de la photo", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-red-600">
        <Trash2 />
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-blue-800 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Etes vous certain de vouloir supprimer la photo {props.name} ?`
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white-800">
            Cette action est irréversible. Elle supprimera définitivement la
            photo.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-green-600">
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(props.id)}
            className="bg-red-600"
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeletePhoto;