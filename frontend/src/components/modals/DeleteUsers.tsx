import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog.tsx"
import { Trash2 } from "lucide-react"
import { mutate } from "swr";
import { useToast } from "../ui/use-toast";

function DeleteUsers(props) {
  const {toast} = useToast()

  const handleDelete = async (userId: number) => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`, {
        method: "DELETE",
      });
      toast({
        description: `L'utilisateur ${props.name} a bien été supprimé`,
      })
      mutate(`${import.meta.env.VITE_BACKEND_URL}/users/`);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur", error)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className="text-red-600"><Trash2 /></AlertDialogTrigger>
      <AlertDialogContent className="bg-blue-800 text-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Etes vous certain de vouloir supprimer l'utilisateur {props.name} ?`</AlertDialogTitle>
          <AlertDialogDescription className="text-white-800">
            Cette action est irréversible. Elle supprimera définitivement l'utilisateur.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-green-600">Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDelete(props.id)} className="bg-red-600">Supprimer</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteUsers
