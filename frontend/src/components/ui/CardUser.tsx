import DeleteUsers from "@/components/modals/DeleteUsers.tsx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.tsx";

interface Data {
  id: number;
  email: string;
  name: string;
  role: string;
}

function CardUser({ data: {email, name, role, id} }: { data: Data }) {
  if (!email) return null;
  return (
    <div className="mb-2">
      <Card className="bg-transparent">
        <CardHeader>
          <CardTitle className="text-yellow-400 text-base">{email}</CardTitle>
          <CardDescription className="text-white opacity-50">{name}</CardDescription>
        </CardHeader>
        <CardContent>
              <p className="text-white opacity-70">{role}</p>
        </CardContent>
        <CardFooter>
          <div className="w-full flex justify-end gap-2">
            <DeleteUsers id={id} name={name}/>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default CardUser;