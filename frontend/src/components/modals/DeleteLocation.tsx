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
} from '@/components/ui/alert-dialog.tsx'
import { Trash2 } from 'lucide-react'
import { mutate } from 'swr'
import { toast } from 'sonner'

interface DeleteLocationProps {
  id: number
  location: string
}

function DeleteLocation(props: DeleteLocationProps) {
  const handleDelete = async (locationId: number) => {
    try {
      await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/locations/${locationId}`,
        {
          method: 'DELETE',
          credentials: 'include'
        }
      )
      toast.success('Lieu correctement supprimé de la base de données !')
      mutate(`${import.meta.env.VITE_BACKEND_URL}/api/locations/`)
    } catch (error) {
      console.error('Erreur lors de la suppression du lieu', error)
      toast.error('Erreur lors de la suppression du lieu...')
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className='text-red-600'>
        <Trash2 />
      </AlertDialogTrigger>
      <AlertDialogContent className='bg-blue-800 text-white'>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Etes vous certain de vouloir supprimer le lieu {props.location} ?`
          </AlertDialogTitle>
          <AlertDialogDescription className='text-white-800'>
            Cette action est irréversible. Elle supprimera définitivement le
            lieu.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='bg-green-600'>
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(props.id)}
            className='bg-red-600'
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteLocation
