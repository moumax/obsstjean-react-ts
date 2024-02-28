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
import { CalendarIcon, PlusCircle } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import * as z from "zod";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Textarea } from "../ui/textarea";
import LocationSelector from "../ui/LocationSelector";

interface AddEventProps {
  id?: number;
  title?: string;
  description?: string;
  date?: Date;
  location?: string;
  hours?: number;
  minutes?: number;
}

function AddEvent(props: AddEventProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    title: z.string().min(5).max(75, {
      message: "Le titre doit contenir entre 5 et 75 caractères",
    }),
    description: z.string().min(5).max(500, {
      message: "La description doit contenir entre 5 et 500 caractères",
    }),
    location: z.string(),
    date: z.date({
      required_error: "Le date de l'évènement est requise",
    }),
    hours: z.coerce.number({
  required_error: "L'heure est requise",
  invalid_type_error: "L'heure doit être un nombre",
}).nonnegative().max(23, {
      message: "Les heures doivent ne doivent pas dépasser 23",
    }),
    minutes: z.coerce.number({
  required_error: "Les minutes sont requises",
  invalid_type_error: "Les minutes doivent être un nombre",
}).nonnegative().max(59, {
      message: "Les heures doivent ne doivent pas dépasser 59",
    }),
  });

  const defaultValues = {
    title: props.title || "",
    description: props.description || "",
    date: props.date ? new Date(props.date) : undefined,
    location: props.location || "",
    hours: props.hours,
    minutes: props.minutes,
  };

  const selectedDateRef = useRef(props.date ? new Date(props.date) : undefined);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (selectedDateRef.current) {
    const year = selectedDateRef.current.getFullYear();
    const month = selectedDateRef.current.getMonth() + 1;
    const day = selectedDateRef.current.getDate();
    const hours = selectedDateRef.current.getHours();
    const minutes = selectedDateRef.current.getMinutes();
    const seconds = selectedDateRef.current.getSeconds();

    // Créez une date en utilisant la date et l'heure locales
    const localDate = new Date(year, month - 1, day + 1, hours, minutes, seconds);

    // Convertissez la date locale en ISO format
    const isoDate = localDate.toISOString().slice(0, 19).replace("T", " ");

      const requestData = { ...values, date: isoDate };
      try {
        await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/events/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
          credentials: "include",
        });
        toast({
          description: `Événement créé avec succès !`,
        });
        setOpen(false);
        mutate(`${import.meta.env.VITE_BACKEND_URL}/api/events/`);
      } catch (error) {
        console.error("Erreur lors de la création de l'événement", error);
      }
    } else {
      console.error("La date sélectionnée est indéfinie");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="">
        <Button className="self-center bg-transparent text-green-600">
          <PlusCircle size={40} />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-blue-900 w-full">
        <DialogHeader>
          <DialogTitle className="text-white mb-3">Créer un evènement</DialogTitle>
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
                    <Input placeholder="Titre de l'évènement" {...field} />
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
                    <Textarea
                      className="h-48"
                      placeholder="Description de l'évènement"
                      {...field}
                    />
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
                            !field.value && "text-muted-foreground w-full",
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
                    <PopoverContent className="p-0 w-max" align="center">
                      <Calendar
                        mode="single"
                        selected={selectedDateRef.current}
                        onSelect={(date) => {
                          if (date instanceof Date) {
                            selectedDateRef.current = date;
                            form.setValue("date", date);
                          }
                        }}
                        disabled={(date) => date < new Date("1900-01-01")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
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
                    <LocationSelector onSelectLocation={(locationId) =>  field.onChange({ target: { value: locationId.toString() } })} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex">
            <FormField
              control={form.control}
              name="hours"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="heure"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="minutes"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="minutes"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <Button className="bg-green-400 w-full" type="submit">
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

export default AddEvent;
