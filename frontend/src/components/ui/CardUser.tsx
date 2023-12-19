import DeleteUsers from "@/components/modals/DeleteUsers.tsx";
import EditUsers from "@/components/modals/EditUsers.tsx";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card.tsx";

interface Data {
  id: number;
  email: string;
  name: string;
  role: string;
  password_hash: string;
}

function CardUser({ data: {email, name, role, id, password_hash} }: { data: Data }) {
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
            <EditUsers id={id} email={email} name={name} role={role} password={password_hash}/>
            <DeleteUsers id={id} name={name}/>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

export default CardUser;