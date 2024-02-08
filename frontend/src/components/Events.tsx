import callAPI from "@/api/callAPI";
import CardEvent from "@/components/ui/CardEvent.tsx";
import useSWR from "swr";

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

  if (errorEvents) return `Erreur lors du chargement : ${errorEvents.message}`;
  if (isLoadingEvents) return "chargement en cours...";

  return (
    <div id="calendar">
      {dataEvents.map((event: Event) => (
        <div key={event.id}>
          <CardEvent data={event} />
        </div>
      ))}
    </div>
  );
}

export default Events;
