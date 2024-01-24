import { Button } from "@/components/ui/button.tsx"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog.tsx"
import { Input } from "@/components/ui/input.tsx"
import { FileEdit } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form.tsx"
import { mutate } from "swr"
import { useToast } from "@/components/ui/use-toast.ts"

function EditMembers(props) {
  const {toast} = useToast()

  const formSchema = z.object({
    member: z.string().max(100, {
      message: "Le nom du membre ne doit pas dépasser 100 caractères",
    }),
    email: z.string().min(5).max(75, {
      message: "L'email doit contenir entre 5 et 75 caractères",
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      member: props.member,
      email: props.email,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/members/${props.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      toast({
        description: `Le membre ${props.member} a bien été modifié`,

      })
      mutate(`${import.meta.env.VITE_BACKEND_URL}/members/`);
    } catch (error) {
      console.error("Erreur lors de la modification du membre", error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild className="bg-transparent text-green-600">
        <Button><FileEdit /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-blue-900">
        <DialogHeader>
          <DialogTitle className="text-white">Modifier un membre</DialogTitle>
          <DialogDescription className="text-white">
            Cliquez sur sauvegarder une fois les modifications effectuées.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="member"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={props.member} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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

export default EditMembers
