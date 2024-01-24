import DeleteMembers from "@/components/modals/DeleteMembers.tsx";
import EditMembers from "@/components/modals/EditMembers.tsx";
import { Card, CardHeader, CardTitle } from "@/components/ui/card.tsx";

interface Data {
  id: number;
  member: string;
  email: string;
}

function CardMember({ data: {member, email, id }}: { data: Data }) {
  if (!member) return null;
  return (
    <div className="mb-2">
      <Card className="bg-transparent">
        <CardHeader>
          <CardTitle className="text-yellow-400 text-base">{member} {email}</CardTitle>
           <div className="w-full flex justify-end gap-2">
             <EditMembers id={id} member={member} email={email} />
             <DeleteMembers id={id} member={member}/>
           </div>
        </CardHeader>
      </Card>
    </div>
  )
}

export default CardMember;
