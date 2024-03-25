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

interface DeleteCameraProps {
  id: number
  brand: string
  model: string
}

function DeleteCamera(props: DeleteCameraProps) {
  const handleDelete = async (cameraId: number) => {
    try {
      await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/cameras/${cameraId}`,
        {
          method: 'DELETE'
        }
      )
      toast.success(
        `La caméra ${props.brand}, ${props.model} a bien été supprimé`
      )
      mutate(`${import.meta.env.VITE_BACKEND_URL}/api/cameras/`)
    } catch (error) {
      toast.error(
        `Erreur lors de la supression de la caméra ${props.brand}, ${props.model}`
      )
      console.error('Erreur lors de la suppression de la caméra', error)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className='text-red-600'>
        <Trash2 size={20} />
      </AlertDialogTrigger>
      <AlertDialogContent className='bg-primaryBlue font-Exo flex flex-col border-0'>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-primaryYellow text-xl'>
            Supprimer la caméra {props.brand} {props.model}
          </AlertDialogTitle>
          <AlertDialogDescription className='text-white/50'>
            Cette action est irréversible. Elle supprimera définitivement la
            caméra.
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

export default DeleteCamera
