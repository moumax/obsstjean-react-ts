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

interface DeletePhotoProps {
  id: number
  name: string
  username: string
  path: string
}

function DeletePhoto(props: DeletePhotoProps) {
  const handleDelete = async (photoId: number) => {
    try {
      await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/gallery/${photoId}`,
        {
          method: 'DELETE',
          credentials: 'include'
        }
      )
      toast.success('Photo correctement supprimé de la base de données !')
      mutate(
        `${import.meta.env.VITE_BACKEND_URL}/api/gallery/${props.username}`
      )
    } catch (error) {
      console.error('Erreur lors de la suppression de la photo', error)
      toast.error('Erreur lors de la suppression de la photo...')
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
            Supprimer la photo {props.name} ?
          </AlertDialogTitle>
          <AlertDialogDescription className='text-white/50'>
            Cette action est irréversible. Elle supprimera définitivement la
            photo.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='bg-cancelButton/80 mt-20'>
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(props.id, props.path)}
            className='bg-validateButton text-black'
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeletePhoto
