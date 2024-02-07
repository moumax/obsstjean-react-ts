import DeleteMembers from "@/components/modals/DeleteMembers.tsx";
import EditMembers from "@/components/modals/EditMembers.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";

interface Data {
  id: number;
  member: string;
  email: string;
}

function CardMember({ data: { member, email, id } }: { data: Data }) {
  if (!member) return null;
  return (
    <div className="mb-2">
      <Card className="bg-transparent">
        <EditMembers id={id} member={member} email={email} />
        <DeleteMembers id={id} member={member} />
        <CardHeader className="items-center p-0">
          <CardTitle className="text-yellow-400 text-base">{member}</CardTitle>
        </CardHeader>
        <CardContent className="p-0 text-center text-gray-500">{email}</CardContent>
        <div className="w-full flex justify-end gap-2"></div>
      </Card>
    </div>
  );
}

export default CardMember;
