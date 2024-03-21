import callAPI from '@/api/callAPI'
import AddEvent from '@/components/modals/AddEvent'
import AddRefractor from '@/components/modals/AddRefractors'
import AddMembers from '@/components/modals/AddMember.tsx'
import AddCamera from '@/components/modals/AddCamera'
import CardEvent from '@/components/ui/CardEvent.tsx'
import CardMember from '@/components/ui/CardMember.tsx'
import CardUser from '@/components/ui/CardUser.tsx'
import CardRefractors from '@/components/ui/CardRefractors.tsx'
import CardLocations from '@/components/ui/CardLocations'
import { Button } from '@/components/ui/button.tsx'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs.tsx'
import { useNavigate } from 'react-router-dom'
import useSWR from 'swr'
import { useAuth } from '@/contexts/AuthContext'
import { CalendarDays, Camera, UserCheck, Users } from 'lucide-react'
import { GoTelescope } from 'react-icons/go'
import { MdOutlineCamera } from 'react-icons/md'
import {
  RefractorData,
  MemberData,
  EventData,
  UserData,
  CameraData,
  LocationData
} from '@/types/types'
import CardCameras from '@/components/ui/CardCamera'
import AddLocation from '@/components/modals/AddLocation'
import PhotoUpload from '@/components/ui/PhotoUpload'
import AdminPhotosDisplay from '@/components/ui/gallery/AdminPhotosDisplay'
import { LoadingSpinner } from '@/components/ui/loader'

function Administration() {
  const { isLoggedIn, userRole, userName } = useAuth()
  const {
    data: dataEvents,
    error: errorEvents,
    isLoading: isLoadingEvents
  } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/api/events/`, callAPI)
  const {
    data: dataUsers,
    error: errorUsers,
    isLoading: isLoadingUsers
  } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, callAPI)
  const {
    data: dataMembers,
    error: errorMembers,
    isLoading: isLoadingMembers
  } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/api/members/`, callAPI)
  const {
    data: dataRefractors,
    error: errorRefractors,
    isLoading: isLoadingRefractors
  } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/api/refractors/`, callAPI)
  const {
    data: dataCameras,
    error: errorCameras,
    isLoading: isLoadingCameras
  } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/api/cameras/`, callAPI)
  const {
    data: dataLocations,
    error: errorLocations,
    isLoading: isLoadingLocations
  } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/api/locations/`, callAPI)

  const navigate = useNavigate()

  if (errorEvents)
    return (
      <div className='text-white'>
        Erreur lors du chargement : {errorEvents.message}
      </div>
    )
  if (isLoadingEvents) return <LoadingSpinner size={72} />

  if (errorUsers)
    return (
      <div className='text-white'>
        Erreur lors du chargement : {errorUsers.message}
      </div>
    )
  if (isLoadingUsers) return <LoadingSpinner size={72} />

  if (errorMembers)
    return (
      <div className='text-white'>
        Erreur lors du chargement : {errorMembers.message}
      </div>
    )
  if (isLoadingMembers) return <LoadingSpinner size={72} />

  if (errorRefractors)
    return (
      <div className='text-white'>
        Erreur lors du chargement : {errorRefractors.message}
      </div>
    )
  if (isLoadingRefractors) return <LoadingSpinner size={72} />

  if (errorCameras)
    return (
      <div className='text-white'>
        Erreur lors du chargement : {errorCameras.message}
      </div>
    )
  if (isLoadingCameras) return <LoadingSpinner size={72} />

  if (errorLocations)
    return (
      <div className='text-white'>
        Erreur lors du chargement : {errorLocations.message}
      </div>
    )
  if (isLoadingLocations) return <LoadingSpinner size={72} />

  const currentDate = new Date()

  const upcomingEvents = dataEvents.filter(
    (event: EventData) => new Date(event.date) > currentDate
  )
  const pastEvents = dataEvents.filter(
    (event: EventData) => new Date(event.date) < currentDate
  )

  upcomingEvents.sort(
    (a: EventData, b: EventData) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
  )
  pastEvents.sort(
    (a: EventData, b: EventData) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  )

  const sortedEvents = [...upcomingEvents, ...pastEvents]

  const actualMembers = dataMembers.filter(
    (member: MemberData) =>
      member.memberType === 'Membre' ||
      member.memberType === 'Membre bienfaiteur'
  )
  const oldMembers = dataMembers.filter(
    (member: MemberData) => member.memberType === 'Ancien membre'
  )
  actualMembers.sort((a: MemberData, b: MemberData) => {
    if (a.member < b.member) return -1
    if (a.member > b.member) return 1
    return 0
  })

  oldMembers.sort((a: MemberData, b: MemberData) => {
    if (a.member < b.member) return -1
    if (a.member > b.member) return 1
    return 0
  })
  const sortedMembers = [...actualMembers, ...oldMembers]

  return (
    <Tabs defaultValue='utilisateurs' className='h-fit'>
      <TabsList className='flex w-full bg-transparent align-middle text-primaryYellow'>
        {isLoggedIn && (
          <div>
            <TabsTrigger className='text-xs' value='utilisateurs'>
              <Users />
            </TabsTrigger>
            <TabsTrigger className='text-xs' value='membres'>
              <UserCheck />
            </TabsTrigger>
            <TabsTrigger className='text-xs' value='evènements'>
              <CalendarDays />
            </TabsTrigger>
            <TabsTrigger className='text-md' value='photos'>
              <Camera />
            </TabsTrigger>
            <TabsTrigger className='text-xl' value='telescope'>
              <GoTelescope />
            </TabsTrigger>
            <TabsTrigger className='text-xl' value='cameras'>
              <MdOutlineCamera />
            </TabsTrigger>
          </div>
        )}
      </TabsList>
      <TabsContent value='utilisateurs' className='mt-10 h-screen'>
        {isLoggedIn &&
          (userRole === 'Administrateur' ? (
            <div>
              <div className='text-white text-xl flex justify-around items-center my-10'>
                Liste des utilisateurs
              </div>
              {dataUsers.map((user: UserData) => (
                <div key={user.id}>
                  <CardUser data={user} />
                </div>
              ))}
              <Button
                variant='destructive'
                type='submit'
                className='w-full mt-3'
                onClick={() => navigate('/')}
              >
                Retour
              </Button>
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center text-xl text-white'>
              Tu n'as pas accès à cette section
              <Button
                variant='destructive'
                type='submit'
                className='w-full mt-3'
                onClick={() => navigate('/')}
              >
                Retour à la page principale
              </Button>
            </div>
          ))}
      </TabsContent>
      <TabsContent value='membres'>
        {isLoggedIn &&
          (userRole === 'Administrateur' ? (
            <div>
              <div className='text-white text-xl flex justify-around items-center my-10'>
                Liste des membres
                <AddMembers />
              </div>
              {sortedMembers.map((member: MemberData) => (
                <div key={member.id}>
                  <CardMember data={member} />
                </div>
              ))}
              <Button
                variant='destructive'
                type='submit'
                className='w-full mt-3'
                onClick={() => navigate('/')}
              >
                Retour
              </Button>
            </div>
          ) : (
            <div className='flex h-screen items-center justify-center text-2xl text-white'>
              Tu n'as pas accès à cette section
            </div>
          ))}
      </TabsContent>
      <TabsContent value='evènements'>
        {isLoggedIn &&
        (userRole === 'Administrateur' ||
          userRole === 'Rédacteur-Photographe') ? (
          <div>
            <div className='text-white text-xl flex justify-around items-center my-10'>
              Liste des évènements <AddEvent />
            </div>
            {sortedEvents.map((event: EventData) => (
              <div key={event.id}>
                <CardEvent data={event} />
              </div>
            ))}
            <div className='text-white text-xl flex justify-around items-center'>
              Adresses des évènements <AddLocation />
            </div>
            {dataLocations.map((location: LocationData) => (
              <div key={location.id}>
                <CardLocations data={location} />
              </div>
            ))}
            <Button
              variant='destructive'
              type='submit'
              className='w-full mt-3'
              onClick={() => navigate('/')}
            >
              Retour
            </Button>
          </div>
        ) : (
          <div className='flex h-screen items-center justify-center text-2xl text-white'>
            Tu n'as pas accès à cette section
          </div>
        )}
      </TabsContent>{' '}
      <TabsContent value='photos'>
        {isLoggedIn &&
        (userRole === 'Administrateur' ||
          userRole === 'Rédacteur-Photographe' ||
          userRole === 'Photographe') ? (
          <div className='flex h-full flex-col items-center justify-center text-3xl text-white'>
            Gestionnaire de photos
            <div className='text-sm w-full'>
              <PhotoUpload username={userName} />
              <AdminPhotosDisplay username={userName} />
            </div>
            <Button
              variant='destructive'
              type='submit'
              className='w-full mt-3'
              onClick={() => navigate('/')}
            >
              Retour
            </Button>
          </div>
        ) : (
          <div className='flex h-screen items-center justify-center text-2xl text-white'>
            Tu n'as pas accès à cette section
          </div>
        )}
      </TabsContent>
      <TabsContent value='telescope'>
        {isLoggedIn &&
        (userRole === 'Administrateur' ||
          userRole === 'Rédacteur-Photographe') ? (
          <div>
            <div className='text-white text-xl flex justify-around items-center my-10'>
              Optiques échantillonnage
              <AddRefractor />
            </div>
            {dataRefractors && dataRefractors.length > 0 ? (
              dataRefractors.map((refractors: RefractorData) => (
                <div key={refractors.id} className='w-full'>
                  <CardRefractors data={refractors} />
                </div>
              ))
            ) : (
              <div>Aucun télescope trouvé</div>
            )}
            <Button
              variant='destructive'
              type='submit'
              className='w-full mt-3'
              onClick={() => navigate('/')}
            >
              Retour
            </Button>
          </div>
        ) : (
          <div className='flex h-screen items-center justify-center text-2xl text-white'>
            Tu n'as pas accès à cette section
          </div>
        )}
      </TabsContent>
      <TabsContent value='cameras'>
        {isLoggedIn &&
        (userRole === 'Administrateur' ||
          userRole === 'Rédacteur-Photographe') ? (
          <div>
            <div className='text-white text-xl flex justify-around items-center my-10'>
              Caméras échantillonnage
              <AddCamera />
            </div>
            {dataCameras && dataCameras.length > 0 ? (
              dataCameras.map((cameras: CameraData) => (
                <div key={cameras.id} className='w-full'>
                  <CardCameras data={cameras} />
                </div>
              ))
            ) : (
              <div>Aucune caméra trouvé</div>
            )}
            <Button
              variant='destructive'
              type='submit'
              className='w-full mt-3'
              onClick={() => navigate('/')}
            >
              Retour
            </Button>
          </div>
        ) : (
          <div className='flex h-screen items-center justify-center text-2xl text-white'>
            Tu n'as pas accès à cette section
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}

export default Administration
