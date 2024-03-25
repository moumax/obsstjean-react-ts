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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger
} from '@/components/ui/select'

interface AddMembersProps {
  member?: string
  email?: string
  subscriptionDate?: string
  memberType?: string
}

function AddMembers(props: AddMembersProps) {
  const [open, setOpen] = useState(false)

  const formSchema = z.object({
    member: z.string().max(100, {
      message: 'Le nom du membre ne doit pas dépasser 100 caractères'
    }),
    email: z.string().email().min(5).max(75, {
      message: "L'email doit contenir entre 5 et 75 caractères"
    }),
    subscriptionDate: z.string().max(100, {
      message: 'La date doit être au format 01 janvier 1900'
    }),
    memberType: z.string().max(50, {
      message: 'Le type de membre ne doit pas dépasser 50 caractères'
    })
  })
  const defaultValues = {
    member: props.member || '',
    email: props.email || '',
    subscriptionDate: props.subscriptionDate || '',
    memberType: props.memberType || ''
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Extraire la valeur de memberType de values
      const { memberType, ...data } = values

      // Créer un objet à envoyer dans la requête
      const requestData = { ...data, memberType }

      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/members/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestData), // Utiliser requestData au lieu de values
        credentials: 'include'
      })
      toast.success('Membre créé avec succès !')
      setOpen(false)
      mutate(`${import.meta.env.VITE_BACKEND_URL}/api/members/`)
    } catch (error) {
      console.error('Erreur lors de la création du membre', error)
      toast.error('Erreur lors de la création du membre...')
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className=''>
        <Button className='self-center bg-transparent text-green-600'>
          <PlusCircle size={40} />
        </Button>
      </DialogTrigger>
      <DialogContent className='bg-primaryBlue font-Exo w-full flex flex-col border-0'>
        <DialogHeader>
          <DialogTitle className='text-primaryYellow text-2xl'>
            Créer un membre
          </DialogTitle>
          <DialogDescription className='text-white/50'>
            Cliquez sur sauvegarder une fois les modifications effectuées.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
            <FormField
              control={form.control}
              name='member'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className='bg-primaryInput'
                      placeholder='Prénom et nom du membre'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className='bg-primaryInput'
                      placeholder='Email du membre'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='subscriptionDate'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className='bg-primaryInput'
                      placeholder='1er janvier 1900'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='memberType'
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='bg-primaryInput'>
                        <SelectValue
                          className='bg-primaryInput'
                          placeholder='Type de membre ?'
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem className='bg-primaryInput' value='Membre'>
                        Membre
                      </SelectItem>
                      <SelectItem
                        className='bg-primaryInput'
                        value='Membre bienfaiteur'
                      >
                        Membre bienfaiteur
                      </SelectItem>
                      <SelectItem
                        className='bg-primaryInput'
                        value='Ancien membre'
                      >
                        Ancien membre
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className='flex w-full gap-2 justify-center'>
          <DialogFooter>
            <Button
              className='bg-validateButton text-sm w-40 text-black'
              type='submit'
            >
              Sauvegarder
            </Button>
          </DialogFooter>
          <DialogClose className='h-10 rounded-md bg-cancelButton text-black text-sm w-40'>
            Annuler
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddMembers
