import { useState, useRef } from 'react'
import { CalendarIcon, FileEdit } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { toast } from 'sonner'
import { mutate } from 'swr'
import { cn } from '@/lib/utils'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/shad/popover'
import { Calendar } from '@/components/ui/shad/calendar'
import LocationSelector from '@/components/locations/LocationSelector'
import { Textarea } from '@/components/ui/shad/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../ui/shad/select'

interface EditEventProps {
  id?: number
  title?: string
  description?: string
  date?: Date
  location?: string
  hours?: number
  minutes?: number
}

function EditEvent(props: EditEventProps) {
  const [open, setOpen] = useState(false)
  const [showCalendar, setShowCalendar] = useState(false)

  const formSchema = z.object({
    title: z.string().min(5).max(75, {
      message: 'Le titre doit contenir entre 5 et 75 caractères'
    }),
    description: z.string().min(5).max(500, {
      message: 'La description doit contenir entre 5 et 500 caractères'
    }),
    date: z.date({
      required_error: "Le date de l'évènee est requise"
    }),
    location: z.string(),
    hours: z.coerce
      .number({
        required_error: "L'heure est requise",
        invalid_type_error: "L'heure doit être un nombre"
      })
      .nonnegative()
      .max(23, {
        message: 'Les heures doivent ne doivent pas dépasser 23'
      }),
    minutes: z.coerce
      .number({
        required_error: 'Les minutes sont requises',
        invalid_type_error: 'Les minutes doivent être un nombre'
      })
      .nonnegative()
      .max(59, {
        message: 'Les heures doivent ne doivent pas dépasser 59'
      })
  })

  const defaultValues = {
    title: props.title || '',
    description: props.description || '',
    date: props.date ? new Date(props.date) : undefined,
    location: props.location || undefined,
    hours: typeof props.hours === 'number' ? props.hours : undefined,
    minutes: typeof props.minutes === 'number' ? props.minutes : undefined
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  })

  const selectedDateRef = useRef(props.date ? new Date(props.date) : undefined)

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (selectedDateRef.current) {
      const year = selectedDateRef.current.getFullYear()
      const month = selectedDateRef.current.getMonth() + 1
      const day = selectedDateRef.current.getDate()
      const hours = selectedDateRef.current.getHours()
      const minutes = selectedDateRef.current.getMinutes()
      const seconds = selectedDateRef.current.getSeconds()

      // Créez une date en utilisant la date et l'heure locales
      const localDate = new Date(
        year,
        month - 1,
        day + 1,
        hours,
        minutes,
        seconds
      )

      const isoDate = localDate.toISOString().slice(0, 19).replace('T', ' ')

      const requestData = { ...values, date: isoDate }
      try {
        await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/events/${props.id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData),
            credentials: 'include'
          }
        )
        toast.success(`L'évènement ${props.title} a bien été modifié`)
        setOpen(false)
        mutate(`${import.meta.env.VITE_BACKEND_URL}/api/events/`)
      } catch (error) {
        console.error("Erreur lors de la modification de l'évènement", error)
        toast.error("Erreur lors de la modification de l'évènement...")
      }
    } else {
      console.error('La date sélectionnée est indéfinie')
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className='bg-transparent text-green-600'>
        <Button>
          <FileEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-primaryBlue w-full font-Exo flex flex-col border-0'>
        <DialogHeader>
          <DialogTitle className='text-primaryYellow text-2xl'>
            Modifier un évènement
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
                    <Textarea
                      className='bg-primaryInput'
                      placeholder={props.description}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='location'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <LocationSelector
                      defaultLocation={props.location}
                      onSelectLocation={locationId =>
                        field.onChange({
                          target: { value: locationId.toString() }
                        })
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='date'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            'w-ful pl-3 text-left font-normal bg-primaryInput',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value ? (
                            format(new Date(field.value), 'PPP')
                          ) : (
                            <span>Sélectionnez une date</span>
                          )}
                          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent
                      className='w-full p-0 bg-primaryInput'
                      align='start'
                    >
                      <Calendar
                        mode='single'
                        locale={fr}
                        selected={selectedDateRef.current}
                        onSelect={date => {
                          if (date instanceof Date) {
                            selectedDateRef.current = date
                            form.setValue('date', date)
                            setShowCalendar(false)
                          }
                        }}
                        disabled={date => date < new Date('1900-01-01')}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex items-center'>
              <FormField
                control={form.control}
                name='hours'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className='bg-primaryInput'>
                          <SelectValue
                            className='bg-primaryInput'
                            placeholder={props.hours}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='bg-primaryInput'>
                        {Array.from({ length: 24 }, (_, index) => (
                          <SelectItem
                            className='bg-primaryInput'
                            key={index}
                            value={String(index)}
                          >
                            {index}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='minutes'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className='bg-primaryInput'>
                          <SelectValue
                            className='bg-primaryInput'
                            placeholder={props.minutes}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='bg-primaryInput'>
                        <SelectItem value='00'>00</SelectItem>
                        <SelectItem value='15'>15</SelectItem>
                        <SelectItem value='30'>30</SelectItem>
                        <SelectItem value='45'>45</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <div className='flex w-full gap-2 justify-center'>
              <Button
                className='bg-validateButton w-40 text-black'
                type='submit'
              >
                Sauvegarder
              </Button>
              <DialogFooter></DialogFooter>
              <DialogClose className='h-10 rounded-md bg-cancelButton/80 text-black w-40'>
                Annuler
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default EditEvent
