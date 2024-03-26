import DeleteEvent from '@/components/events/DeleteEvent'
import EditEvent from '@/components/events/EditEvent'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/shad/card'
import { useAuth } from '@/contexts/AuthContext'

interface Data {
  id: number
  title: string
  description: string
  location: string
  date: Date
  hours: number
  minutes: number
}

function CardEvent({
  data: { id, title, description, location, date, hours, minutes }
}: {
  data: Data
}) {
  if (!title) return null

  const { isLoggedIn } = useAuth()

  const currentPage = window.location.pathname

  const currentDate = new Date()
  const eventDate = new Date(date)

  const isPastEvent = eventDate < currentDate
  const isFutureEvent = eventDate > currentDate

  const formattedDate = eventDate.toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className='mb-2'>
      <Card
        className={`bg-transparent ${isPastEvent ? 'border-red-500 border-opacity-20' : isFutureEvent ? 'border-green-500 border-opacity-20' : ''}`}
      >
        <CardHeader>
          <CardTitle className='text-base text-primaryYellow'>
            {title}
          </CardTitle>
          <CardDescription className='text-white opacity-50'>
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className='p-0 text-start mx-4'>
          <div className='flex flex-col justify-between'>
            <p className='text-white opacity-70 text-sm mb-2'>{location}</p>
            <p className='text-white opacity-70 text-sm text-right'>
              {formattedDate} à {hours === 0 ? '00' : `${hours}`}
              {minutes === 0 ? 'h00' : `h${minutes}`}
            </p>
          </div>
        </CardContent>
        {isLoggedIn && currentPage !== '/' && (
          <CardFooter className='p-0 mx-2'>
            <div className='flex w-full justify-end'>
              <>
                <EditEvent
                  title={title}
                  description={description}
                  date={date}
                  location={location}
                  id={id}
                  hours={hours}
                  minutes={minutes}
                />
                <DeleteEvent id={id} title={title} />
              </>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

export default CardEvent
