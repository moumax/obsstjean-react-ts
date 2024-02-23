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
    <div>
      <Card className="mb-2 bg-transparent">
        <CardHeader className="flex flex-row items-center justify-center gap-x-4 p-0 px-2">
          <CardTitle className="text-sm text-yellow-400">{brand}</CardTitle>
          <CardTitle className="text-sm text-white">{model}</CardTitle>
          <div className="self-end">
            <EditRefractors />
            <DeleteRefractors id={id} brand={brand} model={model} />
          </div>
        </CardHeader>
        <CardContent className="flex items-center justify-center gap-2 p-0 px-2 text-xs">
          <p className="text-white opacity-70">
            Diamètre: <span className="text-green-300">{diameter}</span>
          </p>
          <p className="text-white opacity-70">
            Focale: <span className="text-green-300">{focal}</span>
          </p>
          <p className="text-white opacity-70">
            Focale / Diamètre:{" "}
            <span className="text-green-300">{focal_ratio}</span>
          </p>
        </CardContent>
        <CardFooter className="flex justify-end p-0"></CardFooter>
      </Card>
    </div>
  );
}

export default CardRefractors;
