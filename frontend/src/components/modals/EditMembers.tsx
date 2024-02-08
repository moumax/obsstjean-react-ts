import { Button } from "@/components/ui/button.tsx";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useToast } from "@/components/ui/use-toast.ts";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileEdit } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function EditMembers(props) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    member: z.string().max(100, {
      message: "Le nom du membre ne doit pas dépasser 100 caractères",
    }),
    email: z.string().min(5).max(75, {
      message: "L'email doit contenir entre 5 et 75 caractères",
    }),
    subscriptionDate: z.string().max(100, {
      message: "La date doit être au format 01 janvier 1900",
    }),
    memberType: z.string().max(50, {
      message: "Le type de membre ne doit pas dépasser 50 caractères",
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      member: props.member || "",
      email: props.email || "",
      subscriptionDate: props.subscriptionDate || "",
      memberType: props.memberType || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/members/${props.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
          credentials: "include",
        },
      );
      toast({
        description: `Modification effectuée avec succès !`,
      });
      setOpen(false);
      mutate(`${import.meta.env.VITE_BACKEND_URL}/api/members/`);
    } catch (error) {
      console.error("Erreur lors de la modification du membre", error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="bg-transparent text-green-600">
        <Button>
          <FileEdit />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-blue-900 sm:max-w-[425px]">
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
            <FormField
              control={form.control}
              name="subscriptionDate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Date d'inscription" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="memberType"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={props.memberType}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Type de membre" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Membre">Membre</SelectItem>
                      <SelectItem value="Membre bienfaiteur">
                        Membre bienfaiteur
                      </SelectItem>
                      <SelectItem value="Ancien membre">
                        Ancien membre
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button className="bg-green-400" type="submit">
              Sauvegarder
            </Button>
          </form>
        </Form>
        <DialogFooter></DialogFooter>
        <DialogClose className="h-10 rounded-md bg-red-400 text-white">
          Annuler
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default EditMembers;
