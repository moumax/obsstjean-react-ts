import DeleteUsers from "@/components/modals/DeleteUsers.tsx";
import EditUsers from "@/components/modals/EditUsers.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";

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
    <div>
      <Card className="bg-transparent">
        <CardHeader className="flex flex-row items-center justify-center gap-4 p-0">
          <CardTitle className="text-yellow-400 text-xs">{email}</CardTitle>
          <CardTitle className="text-white text-xs">{name}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
              <p className="text-white opacity-70">{role}</p>
            <EditUsers id={id} email={email} name={name} role={role} password={password_hash}/>
            <DeleteUsers id={id} name={name}/>
        </CardContent>
      </Card>
    </div>
  )
}

export default CardUser;
