
import { Button } from "@/components/ui/button.tsx"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog.tsx"
import { Input } from "@/components/ui/input.tsx"
import { FileEdit } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form.tsx"
import { mutate } from "swr"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx"
import { useToast } from "@/components/ui/use-toast.ts"

function EditUsers(props) {
  const {toast} = useToast()

  const formSchema = z.object({
    email: z.string().min(5).max(75, {
      message: "Le titre doit contenir entre 5 et 75 caractères",
    }),
    name: z.string().min(5).max(500, {
      message: "La description doit contenir entre 5 et 500 caractères",
    }),
    role: z.string().min(5).max(75),
    password: z.string().min(8),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: props.email,
      name: props.name,
      role: props.role,
      password: props.password,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${props.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values), // Envoyer les données du formulaire
      });
      toast({
        description: `L'utilisateur ${props.name} a bien été modifié`,

      })
      mutate(`${import.meta.env.VITE_BACKEND_URL}/users/`);
    } catch (error) {
      console.error("Erreur lors de la modification de l'utilisateur", error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild className="bg-transparent text-green-600">
        <Button><FileEdit /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-blue-900">
        <DialogHeader>
          <DialogTitle className="text-white">Modifier un utilisateur</DialogTitle>
          <DialogDescription className="text-white">
            Cliquez sur sauvegarder une fois les modifications effectuées.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={props.email} {...field} />
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
                <Input placeholder={props.name} {...field} />
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
        <Button className="bg-green-400" type="submit">Sauvegarder</Button>
      </form>
    </Form>
        <DialogFooter>

        </DialogFooter>
        <DialogClose className="bg-red-400 rounded-md h-10 text-white">Annuler</DialogClose>
      </DialogContent>
    </Dialog>
  )
}

export default EditUsers
