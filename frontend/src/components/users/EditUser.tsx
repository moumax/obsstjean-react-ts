import { FileEdit } from 'lucide-react'
import { mutate } from 'swr'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { toast } from 'sonner'
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/shad/select'

interface EditUserProps {
  id: number
  email: string
  name: string
  role: string
  password: string
}

function EditUser(props: EditUserProps) {
  const formSchema = z.object({
    email: z.string().min(5).max(75, {
      message: 'Le titre doit contenir entre 5 et 75 caractères'
    }),
    name: z.string().min(5).max(500, {
      message: 'La description doit contenir entre 5 et 500 caractères'
    }),
    role: z.string().min(5).max(75),
    password: z.string().min(8)
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: props.email,
      name: props.name,
      role: props.role,
      password: props.password
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/${props.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      })
      toast.success(`L'utilisateur ${props.name} a bien été modifié`)
      mutate(`${import.meta.env.VITE_BACKEND_URL}/api/users/`)
    } catch (error) {
      console.error("Erreur lors de la modification de l'utilisateur", error)
      toast.error("Erreur lors de la modification de l'utilisateur...")
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild className='bg-transparent text-green-600'>
        <Button className='w-5 p-0 mx-1'>
          <FileEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-primaryBlue w-full font-Exo flex flex-col border-0'>
        <DialogHeader>
          <DialogTitle className='text-2xl text-primaryYellow mb-3'>
            Modifier un utilisateur
          </DialogTitle>
          <DialogDescription className='text-white/50 mb-3'>
            Cliquez sur sauvegarder une fois les modifications effectuées.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className='bg-primaryInput'
                      placeholder={props.email}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className='bg-primaryInput'
                      placeholder={props.name}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='role'
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='bg-primaryInput'>
                        <SelectValue placeholder='Sélectionnez votre role' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='bg-primaryInput'>
                      <SelectItem value='Administrateur'>
                        Administrateur
                      </SelectItem>
                      <SelectItem value='Rédacteur'>Rédacteur</SelectItem>
                      <SelectItem value='Rédacteur-Photographe'>
                        Rédacteur-Photographe
                      </SelectItem>
                      <SelectItem value='Photographe'>Photographe</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex w-full gap-2 justify-center'>
              <DialogFooter>
                <Button
                  className='bg-validateButton text-black text-sm w-40'
                  type='submit'
                >
                  Sauvegarder
                </Button>
              </DialogFooter>
              <DialogClose className='h-10 rounded-md bg-cancelButton/80 text-black text-sm w-40'>
                Annuler
              </DialogClose>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default EditUser
