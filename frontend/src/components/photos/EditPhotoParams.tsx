import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { FileEdit } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { mutate } from 'swr'
import * as z from 'zod'
import { useState } from 'react'
import { Button } from '@/components/ui/shad/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/shad/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/shad/form'
import { Input } from '@/components/ui/shad/input'

interface EditPhotoParamsProps {
  username: string
  id: number
  title: string
  description: string
}

function EditPhotoParams(props: EditPhotoParamsProps) {
  const [open, setOpen] = useState(false)
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className='bg-transparent text-green-600'>
        <FileEdit />
      </DialogTrigger>
      <DialogContent className='bg-primaryBlue font-Exo flex flex-col border-0 w-full'>
        <DialogHeader>
          <DialogTitle className='text-primaryYellow text-xl'>
            Modifier les paramètres de la photo
          </DialogTitle>
          <DialogDescription className='text-white/50'>
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
                    <Input
                      className='bg-primaryInput'
                      placeholder={props.title}
                      {...field}
                    />
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
                    <Input
                      className='bg-primaryInput'
                      placeholder={props.description}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex w-full gap-2 justify-center'>
              <Button
                className='bg-validateButton w-40 text-black text-sm'
                type='submit'
              >
                Sauvegarder
              </Button>
              <DialogFooter></DialogFooter>
              <DialogClose className='h-10 rounded-md bg-cancelButton/80 text-black w-40 text-sm'>
                Annuler
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default EditPhotoParams
