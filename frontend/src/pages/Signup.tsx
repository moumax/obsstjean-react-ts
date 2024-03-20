import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx"
import { toast } from "sonner"
import signUpSchema from "@/datas/validationUsersSchema.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useSWRConfig } from "swr"
import * as z from "zod"

export default function Signup() {
  const { mutate } = useSWRConfig()
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      role: "",
      photograph: false
    },
  })

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    try {
      await sendDataToDatabase(values);
      toast.success('Ton compte a bien été créé')
      mutate(`${import.meta.env.VITE_BACKEND_URL}/api/users/`)
      navigate("/");
    } catch (error) {
      console.error("Error submitting datas:", error);
      toast.error('Erreur lors de la création de ton compte...')
    }
  }
  const sendDataToDatabase = async (form: { role: string; email: string; password: string; name: string; photograph: boolean }) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      toast.error('Erreur lors de l\'envoi des données au server...')
      throw new Error('Failed to submit data');
    }

    const data = await response.json();
    return data;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 h-screen flex flex-col justify-center items-center" >
        <h1 className="text-white text-xl">Formulaire de création de compte</h1>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Ton email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Ton nom / pseudo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Ton mot de passe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez votre role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Administrateur">Administrateur</SelectItem>
                  <SelectItem value="Rédacteur">Rédacteur</SelectItem>
                  <SelectItem value="Rédacteur-Photographe">Rédacteur-Photographe</SelectItem>
                  <SelectItem value="Photographe">Photographe</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="photograph"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow text-white">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Veux tu partager tes photos sur le site ?
                </FormLabel>
              </div>
            </FormItem>
            )}
        />
        <Button type="submit">Submit</Button>
        <Button
          className="mt-10"
          type="button"
          onClick={() => navigate("/")}
        >
          Retour
        </Button>
      </form>
    </Form>
  )
}
