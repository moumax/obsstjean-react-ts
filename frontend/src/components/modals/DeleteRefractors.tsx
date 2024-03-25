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

interface DeleteRefractorsProps {
  id: number
  brand: string
  model: string
}

function DeleteRefractors(props: DeleteRefractorsProps) {
  const handleDelete = async (refractorId: number) => {
    try {
      await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/refractors/${refractorId}`,
        {
          method: 'DELETE'
        }
      )
      toast.success(
        `Le tube ${props.brand}, ${props.model} a bien été supprimé`
      )
      mutate(`${import.meta.env.VITE_BACKEND_URL}/api/refractors/`)
    } catch (error) {
      console.error('Erreur lors de la suppression du tube', error)
      toast.error('Erreur lors de la suppression du tube...')
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className='text-red-600'>
        <Trash2 size={20} />
      </AlertDialogTrigger>
      <AlertDialogContent className='bg-primaryBlue font-Exo text-white'>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-primaryYellow text-xl'>
            Supprimer le tube {props.brand},{props.model}
          </AlertDialogTitle>
          <AlertDialogDescription className='text-white/50'>
            Cette action est irréversible. Elle supprimera définitivement le
            tube.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='bg-cancelButton/80 text-sm text-black mt-20'>
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(props.id)}
            className='bg-validateButton text-sm text-black'
          >
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteRefractors
