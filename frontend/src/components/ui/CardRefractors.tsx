import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import EditRefractors from "../modals/EditRefractors";
import DeleteRefractors from "../modals/DeleteRefractors";

interface Data {
  id: number;
  brand: string;
  model: string;
  diameter: number;
  focal: number;
  focal_ratio: number;
}

function CardRefractors({
  data: { id, brand, model, diameter, focal, focal_ratio },
}: {
  data: Data;
}) {
  return (
    <Card className="mb-2 bg-transparent">
      <CardHeader className="m-0 mx-2 mb-4 mt-1 flex flex-row items-center justify-between p-0">
        <CardTitle className="text-sm text-primaryYellow">{brand}</CardTitle>
        <div className="flex flex-row gap-2">
          <EditRefractors
            id={id}
            brand={brand}
            model={model}
            diameter={diameter}
            focal={focal}
            focal_ratio={focal_ratio}
          />
          <DeleteRefractors id={id} brand={brand} model={model} />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-2 p-0 px-2 text-xs">
        <div>
          <CardTitle className="text-sm text-white">{model}</CardTitle>
        </div>
        <div className="mb-2 flex flex-row gap-2">
          <p className="text-white opacity-70">
            Diamètre: <span className="text-green-300">{diameter}</span>
          </p>
          <p className="text-white opacity-70">
            Focale: <span className="text-green-300">{focal}</span>
          </p>
          <p className="text-white opacity-70">
            F/D : <span className="text-green-300">{focal_ratio}</span>
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end p-0"></CardFooter>
    </Card>
  );
}

export default CardRefractors;
