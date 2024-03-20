import useSWR from "swr";
import callAPI from "@/api/callAPI";
import CardEvent from "@/components/ui/CardEvent.tsx";
import { LoadingSpinner } from "../ui/loader";

interface Event {
  id: number;
  title: string;
  description: string;
  date: Date;
  location: string;
}

function Events() {
  const {
    data: dataEvents,
    error: errorEvents,
    isLoading: isLoadingEvents,
  } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/api/events/`, callAPI);

  if (errorEvents) return <div className="text-white">Erreur lors du chargement : {errorEvents.message}</div>;
  if (isLoadingEvents) return <LoadingSpinner size={72} />;

  const currentDate = new Date();

  const upcomingEvents = dataEvents.filter((event: Event) => new Date(event.date) > currentDate);
  const pastEvents = dataEvents.filter((event: Event) => new Date(event.date) < currentDate);

  upcomingEvents.sort((a: Event, b: Event) => new Date(a.date).getTime() - new Date(b.date).getTime());
  pastEvents.sort((a: Event, b: Event) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const sortedEvents = [...upcomingEvents, ...pastEvents];

  return (
    <div id="calendar">
      {sortedEvents.map((event: Event) => (
        <div key={event.id}>
          <CardEvent data={event} />
        </div>
      ))}
    </div>
  );
}

export default Events;