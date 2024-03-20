import callAPI from "@/api/callAPI";
import AddEvent from "@/components/modals/AddEvent";
import AddRefractor from "@/components/modals/AddRefractors";
import AddMembers from "@/components/modals/AddMember.tsx";
import AddCamera from "@/components/modals/AddCamera";
import CardEvent from "@/components/ui/CardEvent.tsx";
import CardMember from "@/components/ui/CardMember.tsx";
import CardUser from "@/components/ui/CardUser.tsx";
import CardRefractors from "@/components/ui/CardRefractors.tsx";
import CardLocations from "@/components/ui/CardLocations";
import { Button } from "@/components/ui/button.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { useAuth } from "@/contexts/AuthContext";
import { CalendarDays, Camera, UserCheck, Users } from "lucide-react";
import { GoTelescope } from "react-icons/go";
import { MdOutlineCamera } from "react-icons/md";
import {
  RefractorData,
  MemberData,
  EventData,
  UserData,
  CameraData,
  LocationData,
} from "@/types/types";
import CardCameras from "@/components/ui/CardCamera";
import AddLocation from "@/components/modals/AddLocation";
import PhotoUpload from "@/components/ui/PhotoUpload";
import AdminPhotosDisplay from "@/components/ui/gallery/AdminPhotosDisplay";

function Administration() {
  const { isLoggedIn, userRole, userName } = useAuth();
  const {
    data: dataEvents,
    error: errorEvents,
    isLoading: isLoadingEvents,
  } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/api/events/`, callAPI);
  const {
    data: dataUsers,
    error: errorUsers,
    isLoading: isLoadingUsers,
  } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, callAPI);
  const {
    data: dataMembers,
    error: errorMembers,
    isLoading: isLoadingMembers,
  } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/api/members/`, callAPI);
  const {
    data: dataRefractors,
    error: errorRefractors,
    isLoading: isLoadingRefractors,
  } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/api/refractors/`, callAPI);
  const {
    data: dataCameras,
    error: errorCameras,
    isLoading: isLoadingCameras,
  } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/api/cameras/`, callAPI);
  const {
    data: dataLocations,
    error: errorLocations,
    isLoading: isLoadingLocations,
  } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/api/locations/`, callAPI);

  const navigate = useNavigate();

  if (errorEvents) return `Erreur lors du chargement : ${errorEvents.message}`;
  if (isLoadingEvents) return "chargement en cours...";

  if (errorUsers) return `Erreur lors du chargement : ${errorUsers.message}`;
  if (isLoadingUsers) return "chargement en cours...";

  if (errorMembers)
    return `Erreur lors du chargement : ${errorMembers.message}`;
  if (isLoadingMembers) return "chargement en cours...";

  if (errorRefractors)
    return `Erreur lors du chargement : ${errorRefractors.message}`;
  if (isLoadingRefractors) return "chargement en cours...";

  if (errorCameras)
    return `Erreur lors du chargement : ${errorCameras.message}`;
  if (isLoadingCameras) return "chargement en cours...";

  if (errorLocations)
    return `Erreur lors du chargement : ${errorLocations.message}`;
  if (isLoadingLocations) return "chargement en cours...";

  const currentDate = new Date();

  const upcomingEvents = dataEvents.filter((event: Event) => new Date(event.date) > currentDate);
  const pastEvents = dataEvents.filter((event: Event) => new Date(event.date) < currentDate);

  upcomingEvents.sort((a: Event, b: Event) => new Date(a.date).getTime() - new Date(b.date).getTime());
  pastEvents.sort((a: Event, b: Event) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const sortedEvents = [...upcomingEvents, ...pastEvents];

  return (
    <Tabs defaultValue="utilisateurs" className="h-fit">
      <TabsList className="flex w-full bg-transparent align-middle text-primaryYellow">
        {isLoggedIn && (
          <div>
            <TabsTrigger className="text-xs" value="utilisateurs">
              <Users />
            </TabsTrigger>
            <TabsTrigger className="text-xs" value="membres">
              <UserCheck />
            </TabsTrigger>
            <TabsTrigger className="text-xs" value="evènements">
              <CalendarDays />
            </TabsTrigger>
            <TabsTrigger className="text-md" value="photos">
              <Camera />
            </TabsTrigger>
            <TabsTrigger className="text-xl" value="telescope">
              <GoTelescope />
            </TabsTrigger>
            <TabsTrigger className="text-xl" value="cameras">
              <MdOutlineCamera />
            </TabsTrigger>
          </div>
        )}
      </TabsList>
      <TabsContent value="utilisateurs" className="mt-10 h-screen">
        {isLoggedIn &&
          (userRole === "Administrateur" ? (
            <div>
              <div className="text-white text-xl flex justify-around items-center my-10">
                Liste des utilisateurs
              </div>
              {dataUsers.map((user: UserData) => (
                <div key={user.id}>
                  <CardUser data={user} />
                </div>
              ))}
              <Button variant="destructive" type="submit" className="w-full mt-3" onClick={() => navigate("/")}>
                Retour
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-xl text-white">
              Tu n'as pas accès à cette section
              <Button variant="destructive" type="submit" className="w-full mt-3" onClick={() => navigate("/")}>
                Retour à la page principale
              </Button>
            </div>
          ))}
      </TabsContent>
      <TabsContent value="membres">
        {isLoggedIn &&
          (userRole === "Administrateur" ? (
            <div>
              <div className="text-white text-xl flex justify-around items-center my-10">
                Liste des membres
                <AddMembers />
              </div>
              {dataMembers.map((member: MemberData) => (
                <div key={member.id}>
                  <CardMember data={member} />
                </div>
              ))}
              <Button variant="destructive" type="submit" className="w-full mt-3" onClick={() => navigate("/")}>
                Retour
              </Button>
            </div>
          ) : (
            <div className="flex h-screen items-center justify-center text-2xl text-white">
              Tu n'as pas accès à cette section
            </div>
          ))}
      </TabsContent>
      <TabsContent value="evènements">
        {isLoggedIn &&
          (userRole === "Administrateur" ||
            userRole === "Rédacteur-Photographe") ? (
          <div>
            <div className="text-white text-xl flex justify-around items-center my-10">
              Liste des évènements <AddEvent />
            </div>
            {sortedEvents.map((event: EventData) => (
              <div key={event.id}>
                <CardEvent data={event} />
              </div>
            ))}
            <div className="text-white text-xl flex justify-around items-center">
              Adresses des évènements <AddLocation />
            </div>
            {dataLocations.map((location: LocationData) => (
              <div key={location.id}>
                <CardLocations data={location} />
              </div>
            ))}
            <Button variant="destructive" type="submit" className="w-full mt-3" onClick={() => navigate("/")}>
              Retour
            </Button>
          </div>
        ) : (
          <div className="flex h-screen items-center justify-center text-2xl text-white">
            Tu n'as pas accès à cette section
          </div>
        )}
      </TabsContent>{" "}
      <TabsContent value="photos">
        {isLoggedIn &&
          (userRole === "Administrateur" ||
            userRole === "Rédacteur-Photographe" ||
            userRole === "Photographe") ? (
          <div className="flex h-full flex-col items-center justify-center text-3xl text-white">
            Gestionnaire de photos
            <div className="text-sm w-full">
              <PhotoUpload username={userName} />
              <AdminPhotosDisplay username={userName} />
            </div>
            <Button variant="destructive" type="submit" className="w-full mt-3" onClick={() => navigate("/")}>
              Retour
            </Button>
          </div>
        ) : (
          <div className="flex h-screen items-center justify-center text-2xl text-white">
            Tu n'as pas accès à cette section
          </div>
        )}
      </TabsContent>
      <TabsContent value="telescope">
        {isLoggedIn &&
          (userRole === "Administrateur" ||
            userRole === "Rédacteur-Photographe") ? (
          <div>
            <div className="text-white text-xl flex justify-around items-center my-10">
              Optiques échantillonnage
              <AddRefractor />
            </div>
            {dataRefractors && dataRefractors.length > 0 ? (
              dataRefractors.map((refractors: RefractorData) => (
                <div key={refractors.id} className="w-full">
                  <CardRefractors data={refractors} />
                </div>
              ))
            ) : (
              <div>Aucun télescope trouvé</div>
            )}
            <Button variant="destructive" type="submit" className="w-full mt-3" onClick={() => navigate("/")}>
              Retour
            </Button>
          </div>
        ) : (
          <div className="flex h-screen items-center justify-center text-2xl text-white">
            Tu n'as pas accès à cette section
          </div>
        )}
      </TabsContent>
      <TabsContent value="cameras">
        {isLoggedIn &&
          (userRole === "Administrateur" ||
            userRole === "Rédacteur-Photographe") ? (
          <div>
            <div className="text-white text-xl flex justify-around items-center my-10">
              Caméras échantillonnage
              <AddCamera />
            </div>
            {dataCameras && dataCameras.length > 0 ? (
              dataCameras.map((cameras: CameraData) => (
                <div key={cameras.id} className="w-full">
                  <CardCameras data={cameras} />
                </div>
              ))
            ) : (
              <div>Aucune caméra trouvé</div>
            )}
            <Button variant="destructive" type="submit" className="w-full mt-3" onClick={() => navigate("/")}>
              Retour
            </Button>
          </div>
        ) : (
          <div className="flex h-screen items-center justify-center text-2xl text-white">
            Tu n'as pas accès à cette section
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}

export default Administration;
