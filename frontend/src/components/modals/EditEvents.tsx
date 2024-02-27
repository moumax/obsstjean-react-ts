import { useState, useRef } from "react";
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
import { Input } from "@/components/ui/input.tsx";
import { CalendarIcon, FileEdit } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar.tsx";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { toast } from "@/components/ui/use-toast.ts";
import { mutate } from "swr";

interface EditEventsProps {
  id?: number;
  title?: string;
  description?: string;
  date?: Date;
  location?: string;
  hours?: number;
  minutes?: number;
}

function EditEvents(props: EditEventsProps) {
  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    title: z.string().min(5).max(75, {
      message: "Le titre doit contenir entre 5 et 75 caractères",
    }),
    description: z.string().min(5).max(500, {
      message: "La description doit contenir entre 5 et 500 caractères",
    }),
    date: z.date({
      required_error: "Le date de l'évènee est requise",
    }),
    location: z.string().min(5).max(75, {
      message: "Le lieu doit contenir entre 5 et 75 caractères",
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
    hours: props.hours || 0,
    minutes: props.minutes || 0,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const selectedDateRef = useRef(props.date ? new Date(props.date) : undefined);

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
      await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/events/${props.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
        credentials: "include",
      });
      toast({
        description: `L'évènement ${props.title} a bien été modifié`,
      });
      setOpen(false);
      mutate(`${import.meta.env.VITE_BACKEND_URL}/api/events/`);
    } catch (error) {
      console.error("Erreur lors de la modification de l'évènement", error);
    }
  } else {
    console.error("La date sélectionnée est indéfinie");
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
          <DialogTitle className="text-white">
            Modifier un évènement
          </DialogTitle>
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
                            !field.value && "text-muted-foreground",
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
                        locale={fr}
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
              name="hours"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                    type="number"
                      placeholder={props.hours}
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
                    type="number"
                      placeholder={props.minutes}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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

export default EditEvents;

