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
import { useToast } from "../ui/use-toast";

interface DeleteMemberProps {
  id: number;
  member: string;
}

function DeleteMembers(props: DeleteMemberProps) {
  const { toast } = useToast();

  const handleDelete = async (memberId: number) => {
    try {
      await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/members/${memberId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      toast({
        description: `Membre correctement supprimé de la base de données !`,
      });
      mutate(`${import.meta.env.VITE_BACKEND_URL}/api/members/`);
    } catch (error) {
      console.error("Erreur lors de la suppression du membre ", error);
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
            Etes vous certain de vouloir supprimer le membre {props.member} ?`
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white-800">
            Cette action est irréversible. Elle supprimera définitivement le
            membre.
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

export default DeleteMembers;
