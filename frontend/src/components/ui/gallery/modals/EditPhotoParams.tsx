import { Button } from '@/components/ui/button.tsx'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog.tsx'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form.tsx'
import { Input } from '@/components/ui/input.tsx'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { FileEdit } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { mutate } from 'swr'
import * as z from 'zod'

interface EditPhotoParamsProps {
  username: string
  id: number
  title: string
  description: string
}

function EditPhotoParams(props: EditPhotoParamsProps) {
  const formSchema = z.object({
    title: z.string().min(5).max(75, {
      message: 'Le titre doit contenir entre 5 et 75 caractères'
    }),
    description: z.string().min(5).max(500, {
      message: 'La description doit contenir entre 5 et 500 caractères'
    })
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: props.title || '',
      description: props.description || ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/gallery/${props.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values),
          credentials: 'include'
        }
      )
      toast.success('Modification effectuée avec succès !')
      setOpen(false)
      mutate(
        `${import.meta.env.VITE_BACKEND_URL}/api/gallery/${props.username}`
      )
    } catch (error) {
      console.error(
        'Erreur lors de la modification des paramètres de la photo',
        error
      )
      toast.error(
        'Erreur lors de la modification des paramètres de la photo...'
      )
    }
  }

  return (
    <Dialog>
      <DialogTrigger className='bg-transparent text-green-600'>
        <FileEdit />
      </DialogTrigger>
      <DialogContent className='bg-blue-900 w-full'>
        <DialogHeader>
          <DialogTitle className='text-white'>
            Modifier les paramètres de la photo
          </DialogTitle>
          <DialogDescription className='text-white'>
            Cliquez sur sauvegarder une fois les modifications effectuées.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={props.title} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder={props.description} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='bg-green-400' type='submit'>
              Sauvegarder
            </Button>
          </form>
        </Form>
        <DialogFooter></DialogFooter>
        <DialogClose className='h-10 rounded-md bg-red-400 text-white'>
          Annuler
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default EditPhotoParams
