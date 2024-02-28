import DeleteLocation from "../modals/DeleteLocation";
import EditLocation from "../modals/EditLocation";
import {
  Card,
  CardContent,
  CardFooter,
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
        <CardContent className="p-0">
          <div className="flex flex-col justify-between my-1 mx-3">
            <p className="text-white opacity-70 text-sm">{location}</p>
          </div>
        </CardContent>
        <CardFooter className="p-0">
          <div className="flex w-full justify-end mx-2">
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
