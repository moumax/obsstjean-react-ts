import DeleteMember from '@/components/members/DeleteMember'
import EditMember from '@/components/members/EditMember'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/shad/card'

interface Data {
  id: number
  member: string
  email: string
  subscriptionDate: string
  memberType: string
}

function CardMember({
  data: { member, email, id, subscriptionDate, memberType }
}: {
  data: Data
}) {
  if (!member) return null

  const isMember =
    memberType === 'Membre' || memberType === 'Membre bienfaiteur'
  const isNotMember = memberType === 'Ancien membre'

  return (
    <div className='mb-2'>
      <Card
        className={`bg-transparent ${isNotMember ? 'border-red-500 border-opacity-30' : isMember ? 'border-green-500 border-opacity-30' : ''}`}
      >
        <CardHeader className='items-center p-0 pt-2'>
          <CardTitle className='text-base text-primaryYellow'>
            {member}
          </CardTitle>
        </CardHeader>
        <CardContent className='p-0 text-center text-gray-500'>
          {email}
        </CardContent>
        {subscriptionDate && (
          <CardContent className='p-0 text-center text-gray-500'>
            Membre depuis le {subscriptionDate}
          </CardContent>
        )}
        <CardContent className='p-0 text-center text-gray-500'>
          Statut : {memberType}
        </CardContent>
        <div className='text-end pr-3'>
          <EditMember
            id={id}
            member={member}
            email={email}
            subscriptionDate={subscriptionDate}
            memberType={memberType}
          />
          <DeleteMember id={id} member={member} />
        </div>
        <div className='flex w-full justify-end gap-2'></div>
      </Card>
    </div>
  )
}

export default CardMember
