import DeleteUser from '@/components/users/DeleteUser'
import EditUser from '@/components/users/EditUser'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/shad/card'

interface Data {
  id: number
  email: string
  name: string
  role: string
  password_hash: string
}

function CardUser({
  data: { email, name, role, id, password_hash }
}: {
  data: Data
}) {
  if (!email) return null
  return (
    <div>
      <Card className='bg-transparent flex flex-col mb-2 border-white/20'>
        <CardHeader className='flex flex-row items-center justify-center gap-4 p-0 pt-2'>
          <CardTitle className='text-primaryYellow text-md flex items-center'>
            {email} <span className='text-red-400 ml-4 text-xs'>"{name}"</span>
          </CardTitle>
        </CardHeader>
        <CardContent className='relative flex items-center justify-center'>
          <p className='text-white opacity-70 text-sm'>{role}</p>
          <div className='absolute right-0 bottom-0'>
            <EditUser
              id={id}
              email={email}
              name={name}
              role={role}
              password={password_hash}
            />
            <DeleteUser id={id} name={name} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CardUser
