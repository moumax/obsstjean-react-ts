import { Button } from '@/components/ui/button.tsx'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { mutate } from 'swr'
import * as z from 'zod'
import { toast } from 'sonner'

interface AddRefractorProps {
  brand?: string
  model?: string
  diameter?: number
  focal?: number
  focal_ratio?: number
}

function AddRefractor(props: AddRefractorProps) {
  const [open, setOpen] = useState(false)

  const formSchema = z.object({
    brand: z.string().max(100, {
      message: 'La marque doit contenir au maximum 100 caractères'
    }),
    model: z.string().max(100, {
      message: 'Le modèle doit contenir entre 5 et 500 caractères'
    }),
    diameter: z.coerce.number().positive({ message: 'Value must be positive' }),
    focal: z.coerce.number().positive({ message: 'Value must be positive' }),
    focal_ratio: z.coerce
      .number()
      .positive({ message: 'Value must be positive' })
  })

  const defaultValues = {
    brand: props.brand || '',
    model: props.model || '',
    diameter: props.diameter !== undefined ? props.diameter : '',
    focal: props.focal !== undefined ? props.focal : '',
    focal_ratio: props.focal_ratio !== undefined ? props.focal_ratio : ''
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/refractors/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values),
        credentials: 'include'
      })
      toast.success('Téléscope créé avec succès !')
      setOpen(false)
      mutate(`${import.meta.env.VITE_BACKEND_URL}/api/refractors/`)
    } catch (error) {
      toast.error('Erreur lors de la création du téléscope...')
      console.error('Erreur lors de la création du téléscope', error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='self-center bg-transparent text-green-600'>
          <PlusCircle size={40} />
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-blue-900 w-full'>
        <DialogHeader>
          <DialogTitle className='text-white mb-3'>
            Créer une nouvelle optique
          </DialogTitle>
          <DialogDescription className='text-white'>
            Cliquez sur sauvegarder une fois les modifications effectuées.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
            <FormField
              control={form.control}
              name='brand'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Marque de l\'optique" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='model'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Modèle de l\optique' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='diameter'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Diamètre du téléscope'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='focal'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Focale du téléscope'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='focal_ratio'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Rapport F/D du téléscope'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='bg-green-400 w-full' type='submit'>
              Sauvegarder
            </Button>
          </form>
        </Form>
        <DialogClose className='h-10 rounded-md bg-red-400 text-white'>
          Annuler
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default AddRefractor
