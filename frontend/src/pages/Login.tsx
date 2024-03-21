import { Button } from '@/components/ui/button.tsx'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input.tsx'
import loginSchema from '@/datas/validationLoginSchema.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as z from 'zod'
import { mutate } from 'swr'
import { toast } from 'sonner'

function Login() {
  const navigate = useNavigate()

  interface FormData {
    email: string
    password: string
  }

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      await sendDataToDatabase(values)
      toast.success('Tu est connecté !')
      navigate('/')
      mutate(`${import.meta.env.VITE_BACKEND_URL}/api/session/`)
    } catch (error) {
      console.error('Erreur dans le formulaire :', error)
      toast.error('La connexion a échoué...')
    }
  }

  const sendDataToDatabase = async (form: FormData) => {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form),
        credentials: 'include'
      }
    )

    if (!response.ok) {
      toast.error('Erreur dans le formulaire')
      throw new Error('Erreur dans le formulaire')
    }
    const data = await response.json()
    return data
  }

  return (
    <section className='flex h-screen flex-col justify-center gap-3'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex h-screen flex-col items-center justify-center space-y-8'
        >
          <h1 className='text-xl text-white'>Formulaire de connexion</h1>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Ton email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Ton mot de passe' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type='submit'>Submit</Button>
          <Button className='mt-10' type='button' onClick={() => navigate('/')}>
            Retour
          </Button>
        </form>
      </Form>
    </section>
  )
}

export default Login
