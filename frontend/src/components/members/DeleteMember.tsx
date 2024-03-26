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

interface DeleteMemberProps {
  id: number
  member: string
}

function DeleteMember(props: DeleteMemberProps) {
  const handleDelete = async (memberId: number) => {
    try {
      await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/members/${memberId}`,
        {
          method: 'DELETE',
          credentials: 'include'
        }
      )
      toast.success('Membre correctement supprimé de la base de données !')
      mutate(`${import.meta.env.VITE_BACKEND_URL}/api/members/`)
    } catch (error) {
      console.error('Erreur lors de la suppression du membre', error)
      toast.error('Erreur lors de la suppression du membre')
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
            Supprimer le membre {props.member} ?
          </AlertDialogTitle>
          <AlertDialogDescription className='text-white/50'>
            Cette action est irréversible. Elle supprimera définitivement le
            membre.
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

export default DeleteMember
