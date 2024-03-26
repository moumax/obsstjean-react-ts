import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { FileEdit } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { mutate } from 'swr'
import * as z from 'zod'
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
import { Textarea } from '@/components/ui/shad/textarea'

interface EditLocationProps {
  id: number
  location: string
}

function EditLocation(props: EditLocationProps) {
  const [open, setOpen] = useState(false)

  const formSchema = z.object({
    location: z.string().max(100, {
      message: 'Le lieu ne doit pas dépasser 100 caractères'
    })
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: props.location || ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/locations/${props.id}`,
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
      mutate(`${import.meta.env.VITE_BACKEND_URL}/api/locations/`)
    } catch (error) {
      console.error('Erreur lors de la modification du lieu', error)
      toast.error('Erreur lors de la modification du lieu...')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className='bg-transparent text-green-600'>
        <Button>
          <FileEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-primaryBlue font-Exo w-full flex flex-col border-0'>
        <DialogHeader>
          <DialogTitle className='text-primaryYellow text-2xl'>
            Modifier un lieu
          </DialogTitle>
          <DialogDescription className='text-white/50'>
            Cliquez sur sauvegarder une fois les modifications effectuées.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
            <FormField
              control={form.control}
              name='location'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      className='bg-primaryInput'
                      placeholder={props.location}
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

export default EditLocation
