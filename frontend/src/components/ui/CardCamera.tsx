import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import DeleteCamera from "../modals/DeleteCamera";
import EditCamera from "../modals/EditCamera";

interface Data {
  id: number;
  brand: string;
  model: string;
  sensor: string;
  sensor_type: string;
  sensor_width_mm: number;
  sensor_height_mm: number;
  sensor_width_pixel: number;
  sensor_height_pixel: number;
  photosites: number;
  megapixels: number;
  fps: number;
  dynamic: number;
  bits: number;
  pixel_capacity: number;
  cooler: number;
}

function CardCameras({
  data: {
    id,
    brand,
    model,
    sensor,
    sensor_type,
    sensor_width_mm,
    sensor_height_mm,
    sensor_width_pixel,
    sensor_height_pixel,
    photosites,
    megapixels,
    fps,
    dynamic,
    bits,
    pixel_capacity,
    cooler,
  },
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
            <EditCamera
              id={id}
              brand={brand}
              model={model}
              sensor={sensor}
              sensor_type={sensor_type}
              sensor_width_mm={sensor_width_mm}
              sensor_height_mm={sensor_height_mm}
              sensor_width_pixel={sensor_width_pixel}
              sensor_height_pixel={sensor_height_pixel}
              photosites={photosites}
              megapixels={megapixels}
              fps={fps}
              dynamic={dynamic}
              bits={bits}
              pixel_capacity={pixel_capacity}
              cooler={cooler}
            />
            <DeleteCamera id={id} brand={brand} model={model} />
          </div>
        </CardHeader>
        <CardContent className="flex items-center justify-center gap-2 p-0 px-2 text-xs">
          <div className="mr-4 flex flex-col p-4">
            <p className="text-white opacity-70">
              Capteur: <span className="text-green-300">{sensor}</span>
            </p>
            <p className="text-white opacity-70">
              Type de capteur:{" "}
              <span className="text-green-300">{sensor_type}</span>
            </p>
            <p className="text-white opacity-70">
              Largeur du capteur (mm):{" "}
              <span className="text-green-300">{sensor_width_mm}</span>
            </p>
            <p className="text-white opacity-70">
              Hauteur du capteur (mm):{" "}
              <span className="text-green-300">{sensor_height_mm}</span>
            </p>
            <p className="text-white opacity-70">
              Largeur du capteur (pixel):{" "}
              <span className="text-green-300">{sensor_width_pixel}</span>
            </p>
            <p className="text-white opacity-70">
              Hauteur du capteur (pixel):{" "}
              <span className="text-green-300">{sensor_height_pixel}</span>
            </p>
            <p className="text-white opacity-70">
              Photosites: <span className="text-green-300">{photosites}</span>
            </p>
          </div>
          <div className="flex flex-col p-4">
            <p className="text-white opacity-70">
              Megapixels: <span className="text-green-300">{megapixels}</span>
            </p>
            <p className="text-white opacity-70">
              Images par secondes: <span className="text-green-300">{fps}</span>
            </p>
            <p className="text-white opacity-70">
              Dynamique: <span className="text-green-300">{dynamic}</span>
            </p>
            <p className="text-white opacity-70">
              Bits: <span className="text-green-300">{bits}</span>
            </p>
            <p className="text-white opacity-70">
              Capacités pixel:{" "}
              <span className="text-green-300">{pixel_capacity}</span>
            </p>
            <p className="text-white opacity-70">
              Refroidissement: <span className="text-green-300">{cooler}</span>
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end p-0"></CardFooter>
      </Card>
    </div>
  );
}

export default CardCameras;
