import { Button } from '@/components/ui/button.tsx'
import { toast } from 'sonner'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { PlusCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { mutate } from 'swr'
import * as z from 'zod'

interface AddCameraProps {
  brand?: string
  model?: string
  sensor?: string
  sensor_type?: string
  sensor_width_mm?: number
  sensor_height_mm?: number
  sensor_width_pixel?: number
  sensor_height_pixel?: number
  photosites?: number
  megapixels?: number
  fps?: number
  dynamic?: number
  bits?: number
  pixel_capacity?: number
  cooler?: number
}

function AddCamera(props: AddCameraProps) {
  const [open, setOpen] = useState(false)

  const formSchema = z.object({
    brand: z.string().max(100, {
      message: 'La marque doit contenir au maximum 100 caractères'
    }),
    model: z.string().max(100, {
      message: 'Le modèle doit contenir entre 5 et 500 caractères'
    }),
    sensor: z.string().max(100, {
      message: 'Le capteur doit contenir entre 5 et 500 caractères'
    }),
    sensor_type: z.string().max(10, {
      message: 'Le type de capteur doit contenir entre 5 et 500 caractères'
    }),
    sensor_width_mm: z.coerce.number().positive({
      message: 'Value must be positive'
    }),
    sensor_height_mm: z.coerce.number().positive({
      message: 'Value must be positive'
    }),
    sensor_width_pixel: z.coerce.number().positive({
      message: 'Value must be positive'
    }),
    sensor_height_pixel: z.coerce.number().positive({
      message: 'Value must be positive'
    }),
    photosites: z.coerce.number().positive({
      message: 'Value must be positive'
    }),
    megapixels: z.coerce.number().positive({
      message: 'Value must be positive'
    }),
    fps: z.coerce.number().positive({
      message: 'Value must be positive'
    }),
    dynamic: z.coerce.number().positive({
      message: 'Value must be positive'
    }),
    bits: z.coerce.number().positive({
      message: 'Value must be positive'
    }),
    pixel_capacity: z.coerce.number().positive({
      message: 'Value must be positive'
    }),
    cooler: z.coerce.number().positive({
      message: 'Value must be positive'
    })
  })

  const defaultValues = {
    brand: props.brand || '',
    model: props.model || '',
    sensor: props.sensor || '',
    sensor_type: props.sensor_type || '',
    sensor_width_mm: props.sensor_width_mm,
    sensor_height_mm: props.sensor_height_mm,
    sensor_width_pixel: props.sensor_width_pixel,
    sensor_height_pixel: props.sensor_height_pixel,
    photosites: props.photosites,
    megapixels: props.megapixels,
    fps: props.fps,
    dynamic: props.dynamic,
    bits: props.bits,
    pixel_capacity: props.pixel_capacity,
    cooler: props.cooler
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/cameras/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values),
        credentials: 'include'
      })
      toast.success('Caméra crée avec succès !')
      setOpen(false)
      mutate(`${import.meta.env.VITE_BACKEND_URL}/api/cameras/`)
    } catch (error) {
      console.error('Erreur lors de la création de la caméra', error)
      toast.error('Erreur lors de la création de la caméra...')
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
            Créer une caméra
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
                    <Input placeholder='Marque de la caméra' {...field} />
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
                    <Input placeholder='Modèle de la caméra' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='sensor'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Capteur de la caméra' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='sensor_type'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='Type de capteur de la caméra'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='sensor_width_mm'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='Largeur du capteur de la caméra (mm)'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='sensor_height_mm'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='Hauteur du capteur de la caméra (mm)'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='sensor_width_pixel'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='Largeur du capteur de la caméra (pixel)'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='sensor_height_pixel'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='Largeur du capteur de la caméra (pixel)'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='photosites'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='Photosites de la caméra (mm)'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='megapixels'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='Megapixel de la caméra (mm)'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='fps'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='Images par seconde de la caméra (mm)'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='dynamic'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='Dynamique de la caméra (mm)'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='bits'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Bits de la caméra (mm)' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='pixel_capacity'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='Capacité pixel de la caméra (mm)'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='cooler'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder='Refroidissement de la caméra (mm)'
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
        <DialogFooter></DialogFooter>
        <DialogClose className='h-10 rounded-md bg-red-400 text-white'>
          Annuler
        </DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default AddCamera
