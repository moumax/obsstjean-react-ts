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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useState } from 'react'

function Administration() {
  const { isLoggedIn, userRole, userName } = useAuth()
  const [selectedRefractorBrand, setSelectedRefractorBrand] = useState(null)
  const [selectedCameraBrand, setSelectedCameraBrand] = useState(null)

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

  const uniqueRefractorBrands = [
    ...new Set(
      dataRefractors.map((refractor: RefractorData) => refractor.brand)
    )
  ]
  uniqueRefractorBrands.sort((a, b) => a.localeCompare(b))
  const handleRefractorChange = event => {
    setSelectedRefractorBrand(event)
  }

  const uniqueCameraBrand = [
    ...new Set(dataCameras.map((camera: CameraData) => camera.brand))
  ]

  uniqueCameraBrand.sort((a, b) => a.localeCompare(b))
  const handleCameraChange = event => {
    setSelectedCameraBrand(event)
  }
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
            <div className='pb-10 min-h-screen'>
              <Button
                variant='destructive'
                type='submit'
                className='w-full mt-3 text-black bg-cancelButton/80'
                onClick={() => navigate('/')}
              >
                Retour
              </Button>
              <div className='text-white text-xl flex justify-around items-center my-10'>
                Liste des utilisateurs
              </div>
              {dataUsers.map((user: UserData) => (
                <div key={user.id}>
                  <CardUser data={user} />
                </div>
              ))}
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center text-xl text-white'>
              Tu n'as pas accès à cette section
              <Button
                variant='destructive'
                type='submit'
                className='w-full mt-3 text-black bg-cancelButton/80'
                onClick={() => navigate('/')}
              >
                Retour à la page principale
              </Button>
            </div>
          ))}
      </TabsContent>
      <TabsContent value='membres' className='mt-10 min-h-screen'>
        {isLoggedIn &&
          (userRole === 'Administrateur' ? (
            <div className='pb-10 min-h-screen'>
              <Button
                variant='destructive'
                type='submit'
                className='rouded-4xl w-full mt-3 text-black bg-cancelButton/80'
                onClick={() => navigate('/')}
              >
                Retour
              </Button>
              <div className='text-white text-xl flex justify-around items-center my-10'>
                Liste des membres
                <AddMembers />
              </div>
              {sortedMembers.map((member: MemberData) => (
                <div key={member.id}>
                  <CardMember data={member} />
                </div>
              ))}
            </div>
          ) : (
            <div className='flex flex-col items-center justify-center text-xl text-white'>
              Tu n'as pas accès à cette section
              <Button
                variant='destructive'
                type='submit'
                className='w-full mt-3 text-black bg-cancelButton/80'
                onClick={() => navigate('/')}
              >
                Retour à la page principale
              </Button>
            </div>
          ))}
      </TabsContent>
      <TabsContent value='evènements' className='min-h-screen'>
        {isLoggedIn &&
        (userRole === 'Administrateur' ||
          userRole === 'Rédacteur-Photographe') ? (
          <div className='pb-10 min-h-screen'>
            <Button
              variant='destructive'
              type='submit'
              className='w-full mt-3 text-black bg-cancelButton/80'
              onClick={() => navigate('/')}
            >
              Retour
            </Button>
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
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center text-xl text-white'>
            Tu n'as pas accès à cette section
            <Button
              variant='destructive'
              type='submit'
              className='w-full mt-3 text-black bg-cancelButton/80'
              onClick={() => navigate('/')}
            >
              Retour à la page principale
            </Button>
          </div>
        )}
      </TabsContent>{' '}
      <TabsContent value='photos' className='min-h-screen'>
        <Button
          variant='destructive'
          type='submit'
          className='w-full mt-3 text-black bg-cancelButton/80'
          onClick={() => navigate('/')}
        >
          Retour
        </Button>
        {isLoggedIn &&
        (userRole === 'Administrateur' ||
          userRole === 'Rédacteur-Photographe' ||
          userRole === 'Photographe') ? (
          <div className='flex min-h-screen flex-col items-center justify-center text-2xl text-white mt-5'>
            Gestionnaire de photos
            <div className='text-sm w-full'>
              <PhotoUpload username={userName} />
              <AdminPhotosDisplay username={userName} />
            </div>
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center text-xl text-white'>
            Tu n'as pas accès à cette section
            <Button
              variant='destructive'
              type='submit'
              className='w-full mt-3 text-black bg-cancelButton/80'
              onClick={() => navigate('/')}
            >
              Retour à la page principale
            </Button>
          </div>
        )}
      </TabsContent>
      <TabsContent value='telescope' className='pb-5 min-h-screen'>
        <Button
          variant='destructive'
          type='submit'
          className='w-full mt-3 text-black bg-cancelButton/80'
          onClick={() => navigate('/')}
        >
          Retour
        </Button>
        {isLoggedIn &&
        (userRole === 'Administrateur' ||
          userRole === 'Rédacteur-Photographe') ? (
          <div className='min-h-screen'>
            <div className='text-white text-xl flex justify-around items-center my-10'>
              Optiques échantillonnage
              <AddRefractor />
            </div>
            <Select onValueChange={handleRefractorChange}>
              <SelectTrigger className='w-full bg-primaryInput mb-10'>
                <SelectValue placeholder="Sélectionne une marque d'optique" />
              </SelectTrigger>
              <SelectGroup>
                <SelectContent>
                  {uniqueRefractorBrands.map(brand => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectGroup>
            </Select>
            {selectedRefractorBrand
              ? dataRefractors
                  .filter(
                    (refractor: RefractorData) =>
                      refractor.brand === selectedRefractorBrand
                  )
                  .map((refractor: RefractorData) => (
                    <div key={refractor.id} className='w-full'>
                      <CardRefractors data={refractor} />
                    </div>
                  ))
              : null}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center text-xl text-white'>
            Tu n'as pas accès à cette section
            <Button
              variant='destructive'
              type='submit'
              className='w-full mt-3 text-black bg-cancelButton/80'
              onClick={() => navigate('/')}
            >
              Retour à la page principale
            </Button>
          </div>
        )}
      </TabsContent>
      <TabsContent value='cameras' className='pb-5 min-h-screen'>
        <Button
          variant='destructive'
          type='submit'
          className='w-full mt-3 text-black bg-cancelButton/80'
          onClick={() => navigate('/')}
        >
          Retour
        </Button>
        {isLoggedIn &&
        (userRole === 'Administrateur' ||
          userRole === 'Rédacteur-Photographe') ? (
          <div className='min-h-screen'>
            <div className='text-white text-xl flex justify-around items-center my-10'>
              Caméras échantillonnage
              <AddCamera />
            </div>
            <Select onValueChange={handleCameraChange}>
              <SelectTrigger className='w-full bg-primaryInput mb-10'>
                <SelectValue placeholder='Sélectionne une marque de caméra' />
              </SelectTrigger>
              <SelectGroup>
                <SelectContent>
                  {uniqueCameraBrand.map(brand => (
                    <SelectItem key={brand} value={brand}>
                      {brand}
                    </SelectItem>
                  ))}
                </SelectContent>
              </SelectGroup>
            </Select>
            {selectedCameraBrand
              ? dataCameras
                  .filter(
                    (camera: CameraData) => camera.brand === selectedCameraBrand
                  )
                  .map((camera: CameraData) => (
                    <div key={camera.id} className='w-full'>
                      <CardCameras data={camera} />
                    </div>
                  ))
              : null}
          </div>
        ) : (
          <div className='flex flex-col items-center justify-center text-xl text-white min-h-screen'>
            Tu n'as pas accès à cette section
            <Button
              variant='destructive'
              type='submit'
              className='w-full mt-3 text-black bg-cancelButton/80'
              onClick={() => navigate('/')}
            >
              Retour à la page principale
            </Button>
          </div>
        )}
      </TabsContent>
    </Tabs>
  )
}

export default Administration
