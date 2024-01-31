import callEvents from "@/api/callEvents.ts"
import CardEvent from "@/components/ui/CardEvent.tsx"
import useSWR from "swr"

function Events() {

  const { data, error, isLoading } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/api/events/`, callEvents)

  if (error) return `Erreur lors du chargement : ${error.message}`
  if (isLoading) return "chargement en cours..."

  return (
    <div id="calendar">
      {data.map((event) => (
        <div key={event.id}>
          <CardEvent data={event} />
        </div>
      ))}
    </div>

  )
}

export default Events
