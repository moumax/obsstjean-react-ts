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
import { Trash2 } from 'lucide-react'
import { mutate } from 'swr'
import { toast } from 'sonner'

interface DeleteEventprops {
  id: number
  title: string
}

function DeleteEvent(props: DeleteEventprops) {
  const handleDelete = async (eventId: number) => {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/events/${eventId}`, {
        method: 'DELETE'
      })
      toast.success(`L'évènement ${props.title} a bien été supprimé`)
      mutate(`${import.meta.env.VITE_BACKEND_URL}/api/events/`)
    } catch (error) {
      console.error("Erreur lors de la suppression de l'évènement", error)
      toast.error("Erreur lors de la suppression de l'évènement...")
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className='text-red-600'>
        <Trash2 />
      </AlertDialogTrigger>
      <AlertDialogContent className='bg-primaryBlue font-Exo flex flex-col border-0'>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-primaryYellow'>
            Supprimer l'évènement {props.title} ?
          </AlertDialogTitle>
          <AlertDialogDescription className='text-white/50'>
            Cette action est irréversible. Elle supprimera définitivement
            l'évènement.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='bg-cancelButton/80 text-black mt-20'>
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

export default DeleteEvent
