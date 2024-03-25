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
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { mutate } from 'swr'
import * as z from 'zod'

interface AddLocationProps {
  location?: string
}

function AddLocation(props: AddLocationProps) {
  const [open, setOpen] = useState(false)

  const formSchema = z.object({
    location: z.string().max(100, {
      message: 'Le lieu ne doit pas dépasser 100 caractères'
    })
  })
  const defaultValues = {
    location: props.location || ''
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/locations/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values), // Utiliser requestData au lieu de values
        credentials: 'include'
      })
      toast.success('Lieu crée avec succès !')
      setOpen(false)
      mutate(`${import.meta.env.VITE_BACKEND_URL}/api/locations/`)
    } catch (error) {
      console.error('Erreur lors de la création du lieu', error)
      toast.error('Erreur lors de la création du lieu...')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className=''>
        <Button className='self-center bg-transparent text-green-600 my-10'>
          <PlusCircle size={40} />
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-primaryBlue font-Exo w-full flex flex-col border-0'>
        <DialogHeader>
          <DialogTitle className='text-primaryYellow text-2xl'>
            Créer un lieu
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
                    <Input
                      className='bg-primaryInput'
                      placeholder='Adresse du lieu'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className='flex w-full gap-2 justify-center'>
          <Button className='bg-validateButton w-40 text-black' type='submit'>
            Sauvegarder
          </Button>
          <DialogFooter></DialogFooter>
          <DialogClose className='h-10 rounded-md bg-cancelButton/80 text-black w-40'>
            Annuler
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddLocation
