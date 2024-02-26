import callAPI from "@/api/callAPI";
import AddEvent from "@/components/modals/AddEvent";
import AddRefractor from "@/components/modals/AddRefractors";
import AddMembers from "@/components/modals/AddMember.tsx";
import AddCamera from "@/components/modals/AddCamera";
import CardEvent from "@/components/ui/CardEvent.tsx";
import CardMember from "@/components/ui/CardMember.tsx";
import CardUser from "@/components/ui/CardUser.tsx";
import CardRefractors from "@/components/ui/CardRefractors.tsx";
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
import { RefractorData, MemberData, EventData, UserData, CameraData } from "@/types/types";
import CardCameras from "@/components/ui/CardCamera";

function Administration() {
  const { isLoggedIn, userRole } = useAuth();
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

  return (
    <Tabs defaultValue="utilisateurs" className="h-full">
      <TabsList className="flex w-full bg-transparent align-middle text-yellow-300">
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
              {dataUsers.map((user: UserData) => (
                <div key={user.id}>
                  <CardUser data={user} />
                </div>
              ))}
              <Button type="submit" onClick={() => navigate("/")}>
                Retour
              </Button>
            </div>
          ) : (
            <div className="flex h-screen items-center justify-center text-2xl text-white">
              Tu n'as pas accès à cette section
            </div>
          ))}
      </TabsContent>
      <TabsContent value="membres">
        {isLoggedIn &&
          (userRole === "Administrateur" ? (
            <div>
              <AddMembers />
              {dataMembers.map((member: MemberData) => (
                <div key={member.id}>
                  <CardMember data={member} />
                </div>
              ))}
              <Button type="submit" onClick={() => navigate("/")}>
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
            <AddEvent />
            {dataEvents.map((event: EventData) => (
              <div key={event.id}>
                <CardEvent data={event} />
              </div>
            ))}
            <Button type="submit" onClick={() => navigate("/")}>
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
          <div className="flex h-screen flex-col items-center justify-center text-3xl text-white">
            Photos des membres
            <Button type="submit" onClick={() => navigate("/")}>
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
          (userRole === "Administrateur" || userRole === "Rédacteur-Photographe") ? (
          <div className="flex h-full flex-col items-center justify-center text-3xl text-white">
            Gestion des tubes pour échantillonnage
            <AddRefractor />
            {dataRefractors && dataRefractors.length > 0 ? (
              dataRefractors.map((refractors: RefractorData) => (
                <div key={refractors.id}>
                  <CardRefractors data={refractors} />
                </div>
              ))
            ) : (
              <div>Aucun télescope trouvé</div>
            )}
            <Button type="submit" onClick={() => navigate("/")}>
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
          (userRole === "Administrateur" || userRole === "Rédacteur-Photographe") ? (
          <div className="flex h-full flex-col items-center justify-center text-3xl text-white">
            Gestion des caméras pour échantillonnage
            <AddCamera />
            {dataCameras && dataCameras.length > 0 ? (
              dataCameras.map((cameras: CameraData) => (
                <div key={cameras.id}>
                  <CardCameras data={cameras} />
                </div>
              ))
            ) : (
              <div>Aucune caméra trouvé</div>
            )}
            <Button type="submit" onClick={() => navigate("/")}>
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
