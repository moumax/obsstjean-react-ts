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
  subscriptionDate: string;
  memberType: string;
}

function CardMember({
  data: { member, email, id, subscriptionDate, memberType },
}: {
  data: Data;
}) {
  if (!member) return null;
  return (
    <div className="mb-2">
      <Card className="bg-transparent">
        <EditMembers
          id={id}
          member={member}
          email={email}
          subscriptionDate={subscriptionDate}
          memberType={memberType}
        />
        <DeleteMembers id={id} member={member} />
        <CardHeader className="items-center p-0">
          <CardTitle className="text-base text-primaryYellow">{member}</CardTitle>
        </CardHeader>
        <CardContent className="p-0 text-center text-gray-500">
          {email}
        </CardContent>
        <CardContent className="p-0 text-center text-gray-500">
          {subscriptionDate}
        </CardContent>
        <CardContent className="p-0 text-center text-gray-500">
          {memberType}
        </CardContent>
        <div className="flex w-full justify-end gap-2"></div>
      </Card>
    </div>
  );
}

export default CardMember;
