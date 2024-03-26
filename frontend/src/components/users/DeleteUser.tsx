import { Trash2 } from 'lucide-react'
import { mutate } from 'swr'
import { toast } from 'sonner'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/shad/alert-dialog'
import { Button } from '@/components/ui/shad/button'

interface DeleteUserProps {
  id: number
  name: string
}

function DeleteUser(props: DeleteUserProps) {
  const handleDelete = async (userId: number) => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`, {
        method: 'DELETE'
      })
      toast.success(`L'utilisateur ${props.name} a bien été supprimé`)
      mutate(`${import.meta.env.VITE_BACKEND_URL}/api/users/`)
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur", error)
      toast.error("Erreur lors de la suppression de l'utilisateur")
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild className='text-red-600 bg-transparent'>
        <Button className='w-5 p-0 mx-1'>
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='bg-primaryBlue font-Exo flex flex-col border-0'>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-primaryYellow'>
            Supprimer l'utilisateur {props.name} ?
          </AlertDialogTitle>
          <AlertDialogDescription className='text-white/50'>
            Cette action est irréversible. Elle supprimera définitivement
            l'utilisateur.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='bg-cancelButton/80 mt-20'>
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(props.id)}
            className='bg-validateButton text-black'
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteUser
