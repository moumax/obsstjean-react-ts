import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx"
import { useToast } from "@/components/ui/use-toast"
import signUpSchema from "@/datas/validationUsersSchema.ts"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { useSWRConfig } from "swr"
import * as z from "zod"

export default function Signup() {
  const { mutate } = useSWRConfig()
  const navigate = useNavigate();
  const { toast } = useToast();

  interface FormData {
    email: string;
    name: string;
    password: string;
    role: string;
  }

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      name: "",
      password: "",
      role: "",
    },
  })

  async function onSubmit(values: z.infer<typeof signUpSchema>) {
    try {
      await sendDataToDatabase(values);
      toast({
        description: "Le compte a bien été créé",
      })
      mutate(`${import.meta.env.VITE_BACKEND_URL}/users/`)
      navigate("/");
    } catch (error) {
      console.error("Error submitting datas:", error);
    }
  }

  const sendDataToDatabase = async (form: FormData) => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      throw new Error('Failed to submit data');
    }

    // You can handle the response here if needed
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