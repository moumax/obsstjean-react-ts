import DeleteEvents from "@/components/modals/DeleteEvents.tsx";
import EditEvents from "@/components/modals/EditEvents.tsx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.tsx";

interface Data {
  id: number;
  title: string;
  description: string;
  location: string;
  date: Date;
}

function CardEvent({ data: {id, title, description, location, date } }: { data: Data }) {
  if (!title) return null;
  return (
    <div className="mb-2">
      <Card className="bg-transparent">
        <CardHeader>
          <CardTitle className="text-yellow-400 text-base">{title}</CardTitle>
          <CardDescription className="text-white opacity-50">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col justify-between">
              <p className="text-white opacity-70">A quel endroit ?</p>
              <p className="text-white opacity-70">{location}</p>
              <p className="text-white opacity-70">{date}</p>
          </div>
        </CardContent>
        <CardFooter>
          <div className="w-full flex justify-end gap-2">
            <EditEvents title={title} description={description} date={date} location={location} id={id}/>
            <DeleteEvents id={id} title={title}/>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default CardEvent;
