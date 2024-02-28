import DeleteEvents from "@/components/modals/DeleteEvents.tsx";
import EditEvents from "@/components/modals/EditEvents.tsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { useAuth } from "@/contexts/AuthContext";

interface Data {
  id: number;
  title: string;
  description: string;
  location: string;
  date: Date;
  hours: number;
  minutes: number;
}

function CardEvent({
  data: { id, title, description, location, date, hours, minutes },
}: {
  data: Data;
}) {
  if (!title) return null;

  const { isLoggedIn } = useAuth();

  const currentPage = window.location.pathname;

  const formattedDate = new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mb-2">
      <Card className="bg-transparent">
        <CardHeader>
          <CardTitle className="text-base text-yellow-400">{title}</CardTitle>
          <CardDescription className="text-white opacity-50">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 text-start mx-4">
          <div className="flex flex-col justify-between">
            <p className="text-white opacity-70 text-sm mb-2">{location}</p>
            <p className="text-white opacity-70 text-sm">{formattedDate} à {hours == 0 ? "00" : `${hours}`}{minutes == 0 ? "h00" : `h${minutes}`}</p>
          </div>
        </CardContent>
            {isLoggedIn && currentPage !== "/" && (
        <CardFooter className="p-0 mx-2">
          <div className="flex w-full justify-end">
              <>
                <EditEvents
                  title={title}
                  description={description}
                  date={date}
                  location={location}
                  id={id}
                  hours={hours}
                  minutes={minutes}
                />
                <DeleteEvents id={id} title={title} />
              </>
          </div>
        </CardFooter>
            )}
      </Card>
    </div>
  );
}

export default CardEvent;
