import DeleteLocation from "../modals/DeleteLocation";
import EditLocation from "../modals/EditLocation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { useAuth } from "@/contexts/AuthContext";

interface Data {
  id: number;
  location: string;
}

function CardLocations({
  data: { id, location },
}: {
  data: Data;
}) {
  const { isLoggedIn } = useAuth();

  const currentPage = window.location.pathname;

  return (
    <div className="mb-2">
      <Card className="bg-transparent">
        <CardContent>
          <div className="flex flex-col justify-between">
            <p className="text-white opacity-70">{location}</p>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex w-full justify-end gap-2">
            {isLoggedIn && currentPage !== "/" && (
              <>
                <EditLocation location={location} id={id} />
                <DeleteLocation id={id} location={location} />
              </>
            )}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default CardLocations;
