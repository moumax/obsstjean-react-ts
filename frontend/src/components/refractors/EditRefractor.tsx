import { useState } from 'react'
import { FileEdit } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
import { mutate } from 'swr'
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
import { Input } from '@/components/ui/shad/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/shad/form'

interface EditRefractorProps {
  id?: number
  brand?: string
  model?: string
  diameter?: number
  focal?: number
  focal_ratio?: number
}

function EditRefractor(props: EditRefractorProps) {
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
    id: props.id || 0,
    brand: props.brand || '',
    model: props.model || '',
    diameter: props.diameter || 0,
    focal: props.focal || 0,
    focal_ratio: props.focal_ratio || 0
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/refractors/${props.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values),
          credentials: 'include'
        }
      )
      toast.success(
        `Le téléscope ${props.brand} ${props.model} a bien été modifié`
      )
      setOpen(false)
      mutate(`${import.meta.env.VITE_BACKEND_URL}/api/refractors/`)
    } catch (error) {
      console.error('Erreur lors de la modification du téléscope', error)
      toast.error('Erreur lors de la modification du téléscope...')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className='bg-transparent text-green-600'>
        <FileEdit size={20} />
      </DialogTrigger>
      <DialogContent className='bg-primaryBlue font-Exo w-full flex flex-col border-0'>
        <DialogHeader>
          <DialogTitle className='text-primaryYellow text-2xl'>
            Modifier un téléscope
          </DialogTitle>
          <DialogDescription className='text-white/50'>
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
                    <Input
                      className='bg-primaryInput'
                      placeholder={props.brand}
                      {...field}
                      onChange={e => {
                        const upperCaseValue = e.target.value.toUpperCase()
                        field.onChange(upperCaseValue)
                      }}
                    />
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
                    <Input
                      className='bg-primaryInput'
                      placeholder={props.model}
                      {...field}
                    />
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
                      className='bg-primaryInput'
                      type='number'
                      placeholder={props.diameter?.toString()}
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
                      className='bg-primaryInput'
                      type='number'
                      placeholder={props.focal?.toString()}
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
                      className='bg-primaryInput'
                      placeholder={props.focal_ratio?.toString()}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex w-full gap-2 justify-center'>
              <Button
                className='bg-validateButton text-sm text-black w-40'
                type='submit'
              >
                Sauvegarder
              </Button>
              <DialogFooter></DialogFooter>
              <DialogClose className='h-10 rounded-md bg-cancelButton/80 text-sm text-black w-40'>
                Annuler
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default EditRefractor
