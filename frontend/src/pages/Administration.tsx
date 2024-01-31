import callEvents from "@/api/callEvents.ts"
import callMembers from "@/api/callMembers"
import callUsers from "@/api/callUsers.ts"
import CardEvent from "@/components/ui/CardEvent.tsx"
import CardMember from "@/components/ui/CardMember.tsx"
import CardUser from "@/components/ui/CardUser.tsx"
import { Button } from "@/components/ui/button.tsx"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx"
import { useNavigate } from "react-router-dom"
import useSWR from "swr"

function Administration() {
  const { data, error, isLoading } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/api/events/`, callEvents)
  const { data: dataUsers, error: errorUsers, isLoading: isLoadingUsers } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/api/users/`, callUsers)
  const { data: dataMembers, error: errorMembers, isLoading: isLoadingMembers} = useSWR(`${import.meta.env.VITE_BACKEND_URL}/api/members/`, callMembers)

  const navigate = useNavigate();

  if (error) return `Erreur lors du chargement : ${error.message}`
  if (isLoading) return "chargement en cours..."

  if (errorUsers) return `Erreur lors du chargement : ${errorUsers.message}`
  if (isLoadingUsers) return "chargement en cours..."

  if (errorMembers) return `Erreur lors du chargement : ${errorMembers.message}`
  if (isLoadingMembers) return "chargement en cours..."

  return (
    <Tabs defaultValue="utilisateurs" className="h-full">
      <TabsList>
        <TabsTrigger value="utilisateurs">Utilisateurs</TabsTrigger>
        <TabsTrigger value="evènements">Evènements</TabsTrigger>
        <TabsTrigger value="membres">Membres</TabsTrigger>
      </TabsList>
      <TabsContent value="utilisateurs">
        <div>
          {dataUsers.map((user) => (
            <div key={user.id}>
              <CardUser data={user} />
            </div>
          ))}
          <Button
            type="submit"
            onClick={() => navigate("/")}
          >
            Retour
          </Button>
        </div>
</TabsContent>
      <TabsContent value="evènements">
        <div>
          {data.map((event) => (
            <div key={event.id}>
              <CardEvent data={event} />
            </div>
          ))}
          <Button
            type="submit"
            onClick={() => navigate("/")}
          >
            Retour
          </Button>
        </div>
      </TabsContent>
      <TabsContent value="membres">
        <div>
          {dataMembers.map((member) => (
            <div key={member.id}>
              <CardMember data={member} />
            </div>
          ))}
          <Button
            type="submit"
            onClick={() => navigate("/")}
          >
            Retour
          </Button>
        </div>
</TabsContent>
    </Tabs>
  )
}

export default Administration
