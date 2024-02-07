import callAuth from "@/api/callAuth";
import callEvents from "@/api/callEvents.ts";
import callMembers from "@/api/callMembers";
import callUsers from "@/api/callUsers.ts";
import AddMembers from "@/components/modals/AddMember.tsx";
import CardEvent from "@/components/ui/CardEvent.tsx";
import CardMember from "@/components/ui/CardMember.tsx";
import CardUser from "@/components/ui/CardUser.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";

function Administration() {
  const { data: dataSession } = useSWR(
    `${import.meta.env.VITE_BACKEND_URL}/api/session/`,
    callAuth,
  );
  console.log(dataSession.role);
  const { data, error, isLoading } = useSWR(
    `${import.meta.env.VITE_BACKEND_URL}/api/events/`,
    callEvents,
  );
  const {
    data: dataUsers,
    error: errorUsers,
    isLoading: isLoadingUsers,
  } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, callUsers);
  const {
    data: dataMembers,
    error: errorMembers,
    isLoading: isLoadingMembers,
  } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/api/members/`, callMembers);

  const navigate = useNavigate();

  if (error) return `Erreur lors du chargement : ${error.message}`;
  if (isLoading) return "chargement en cours...";

  if (errorUsers) return `Erreur lors du chargement : ${errorUsers.message}`;
  if (isLoadingUsers) return "chargement en cours...";

  if (errorMembers)
    return `Erreur lors du chargement : ${errorMembers.message}`;
  if (isLoadingMembers) return "chargement en cours...";

  return (
    <Tabs defaultValue="utilisateurs" className="h-full">
      <TabsList>
        {dataSession && (
          <div>
            <TabsTrigger value="utilisateurs">Utilisateurs</TabsTrigger>
            <TabsTrigger value="membres">Membres</TabsTrigger>
            <TabsTrigger value="evènements">Evènements</TabsTrigger>
            <TabsTrigger value="photos">Photos</TabsTrigger>
          </div>
        )}
      </TabsList>
      <TabsContent value="utilisateurs">
        {dataSession &&
          (dataSession.role === "Administrateur" ? (
            <div>
              {dataUsers.map((user) => (
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
        {dataSession &&
          (dataSession.role === "Administrateur" ? (
            <div>
              <AddMembers />
              {dataMembers.map((member) => (
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
        {dataSession &&
        (dataSession.role === "Administrateur" ||
          dataSession.role === "Rédacteur-Photographe") ? (
          <div>
            {data.map((event) => (
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
        {dataSession &&
        (dataSession.role === "Administrateur" ||
          dataSession.role === "Rédacteur-Photographe" ||
          dataSession.role === "Photographe") ? (
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
    </Tabs>
  );
}

export default Administration;
