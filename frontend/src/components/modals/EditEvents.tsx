import { Button } from "@/components/ui/button.tsx"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog.tsx"
import { Input } from "@/components/ui/input.tsx"
import { CalendarIcon, FileEdit } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form.tsx"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar.tsx"
import { format, parseISO } from "date-fns"
import { useRef } from "react"
import { toast } from "@/components/ui/use-toast.ts"
import { mutate } from "swr"

function EditEvents(props) {
  const formSchema = z.object({
    title: z.string().min(5).max(75, {
      message: "Le titre doit contenir entre 5 et 75 caractères",
    }),
    description : z.string().min(5).max(500, {
      message: "La description doit contenir entre 5 et 500 caractères",
    }),
    date: z.date({
      required_error: "Le date de l'évènee est requise",
    }),
    location: z.string().min(5).max(75, {
      message: "Le lieu doit contenir entre 5 et 75 caractères",
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: props.title,
      description: props.description,
      location: props.location,
      date: props.date ? new Date(props.date) : undefined,
    },
  })

  const selectedDateRef = useRef(props.date ? new Date(props.date) : undefined);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Mettez à jour les valeurs dans le formulaire
    form.setValue("date", selectedDateRef.current);
    try {
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/events/${props.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values), // Envoyer les données du formulaire
      });
      toast({
        description: `L'évènement ${props.title} a bien été modifié`,
      })
      mutate(`${import.meta.env.VITE_BACKEND_URL}/events/`);
    } catch (error) {
      console.error("Erreur lors de la modification de l'évènement", error)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild className="bg-transparent text-green-600">
        <Button><FileEdit /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-blue-900">
        <DialogHeader>
          <DialogTitle className="text-white">Modifier un évènement</DialogTitle>
          <DialogDescription className="text-white">
            Cliquez sur sauvegarder une fois les modifications effectuées.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={props.title} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={props.description} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder={props.location} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[240px] pl-3 text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? (
                      format(new Date(field.value), "PPP")
                    ) : (
                      <span>Sélectionnez une date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDateRef.current}
                  onSelect={(date) => {
                    // Mettez à jour la référence lorsqu'une nouvelle date est sélectionnée
                    selectedDateRef.current = date;
                    // Mettez également à jour le champ du formulaire
                    form.setValue("date", date);
                  }}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
                </PopoverContent>
              </Popover>
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

export default EditEvents
