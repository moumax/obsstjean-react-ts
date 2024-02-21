import { useState } from "react";
import useSWR from "swr";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import callAPI from "@/api/callAPI";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.tsx";
import { Input } from "./ui/input";
import { sampleCalculation } from "@/utils/sampleCalculation";
import {
  widthMinuteCalculation,
  heightMinuteCalculation,
  diagonalMinuteCalculation,
} from "@/utils/minuteCalculation";
import {
  widthSecondCalculation,
  heightSecondCalculation,
  diagonalSecondCalculation,
} from "@/utils/secondCalculation";
import {
  resolutionCalculation,
  resolutionCalculationWithBarlow,
} from "@/utils/resolutionCalculation";
import { CameraData, RefractorData, WavelengthData } from "@/types/types";

function Sampling() {
  const [turbulence, setTurbulence] = useState(1);
  const [barlowSize, setBarlowSize] = useState(1);
  const [selectedCamera, setSelectedCamera] = useState<CameraData | null>(null);
  const [selectedRefractor, setSelectedRefractor] =
    useState<RefractorData | null>(null);
  const [selectedWavelength, setSelectedWavelength] =
    useState<WavelengthData | null>(null);

  const {
    data: dataCameras,
    error: errorCameras,
    isLoading: isLoadingCameras,
  } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/api/cameras/`, callAPI);

  const {
    data: dataRefractors,
    error: errorRefractors,
    isLoading: isLoadingRefractors,
  } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/api/refractors/`, callAPI);

  const {
    data: dataWavelength,
    error: errorWavelength,
    isLoading: isLoadingWavelength,
  } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/api/wavelength/`, callAPI);

  const handleCameraSelection = (camera: CameraData) => {
    setSelectedCamera(camera);
  };

  const handleRefractorSelection = (refractor: RefractorData) => {
    setSelectedRefractor(refractor);
  };

  const handleWavelengthSelection = (wavelength: WavelengthData) => {
    setSelectedWavelength(wavelength);
  };

  if (errorCameras)
    return `Erreur lors du chargement : ${errorCameras.message}`;
  if (isLoadingCameras) return "chargement en cours...";

  if (errorRefractors)
    return `Erreur lors du chargement : ${errorRefractors.message}`;
  if (isLoadingRefractors) return "chargement en cours...";

  if (errorWavelength)
    return `Erreur lors du chargement : ${errorWavelength.message}`;
  if (isLoadingWavelength) return "chargement en cours...";

  const widthSecondCalculationResult = widthSecondCalculation(
    selectedRefractor,
    selectedCamera,
  );

  const heightSecondCalculationResult = heightSecondCalculation(
    selectedRefractor,
    selectedCamera,
  );

  const diagonalSecondCalculationResult = diagonalSecondCalculation(
    selectedRefractor,
    selectedCamera,
  );

  const widthMinuteCalculationResult = widthMinuteCalculation(
    selectedRefractor,
    selectedCamera,
  );

  const heightMinuteCalculationResult = heightMinuteCalculation(
    selectedRefractor,
    selectedCamera,
  );

  const diagonalMinuteCalculationResult = diagonalMinuteCalculation(
    selectedRefractor,
    selectedCamera,
  );

  const resolutionCalculationResult = resolutionCalculation(
    selectedWavelength,
    selectedRefractor,
  );

  const resolutionCalculationWithBarlowResult = resolutionCalculationWithBarlow(
    selectedWavelength,
    selectedRefractor,
  );

  const sampleCalculationResult = sampleCalculation(
    selectedRefractor,
    selectedCamera,
    barlowSize,
  );

  const resolution = resolutionCalculationResult;
  const resolutionWithBarlow = resolutionCalculationWithBarlowResult;

  const idealSample = () => {
    let newResolution: number;

    if (selectedRefractor && selectedCamera) {
      resolution < turbulence
        ? (newResolution = turbulence)
        : (newResolution = resolution);

      const focalMini =
        (selectedCamera.photosites * 206.26) / (newResolution / 2);
      const focalMaxi =
        (selectedCamera.photosites * 206.26) / (newResolution / 3);
      const focalFdMini =
        (selectedCamera.photosites * 206.26) /
        (newResolution / 2) /
        selectedRefractor.diameter;
      const focalFdMaxi =
        (selectedCamera.photosites * 206.26) /
        (newResolution / 3) /
        selectedRefractor.diameter;

      return (
        <div>
          <p>
            {focalMini.toFixed(0)} <span>&lt;</span> Focale <span>&lt;</span>{" "}
            {focalMaxi.toFixed(0)}
          </p>
          <p>
            {focalFdMini.toFixed(0)} <span>&lt;</span> F/D <span>&lt;</span>{" "}
            {focalFdMaxi.toFixed(0)}
          </p>
        </div>
      );
    } else {
      return (
        <div className="pb-10 pt-10">
          Tu dois sélectionner une caméra ainsi qu'un tube optique !
        </div>
      );
    }
  };

  const handleTurbulence = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    setTurbulence(newValue);
  };

  const handleBarlowSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    setBarlowSize(newValue);
  };

  const resultSampling = () => {
    let newResolution: number;

    if (selectedRefractor && selectedCamera) {
      resolution < turbulence
        ? (newResolution = turbulence)
        : (newResolution = resolution);

      const focalMini =
        (selectedCamera.photosites * 206.26) / (newResolution / 2);
      const focalMaxi =
        (selectedCamera.photosites * 206.26) / (newResolution / 3);

      let calculation: number = barlowSize * selectedRefractor.focal;

      if (calculation < focalMini)
        return <p className="text-red-400">Sous echantillonnage</p>;
      if (calculation > focalMaxi)
        return <p className="text-red-400">Sur echantillonnage</p>;

      return <p className="text-green-400">Echantillonnage correct</p>;
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-white">Calculateur de focale</DialogTrigger>
      <DialogContent className="z-50">
        <DialogHeader>
          <DialogTitle>Calculateur d'échantillonage</DialogTitle>
          <DialogDescription>
            <h2 className="pb-6 pt-6">
              Sélectionne une monture puis une caméra pour savoir si la
              configuration est adéquate.
            </h2>
            <Select
              onValueChange={(value) =>
                handleCameraSelection(value as unknown as CameraData)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez votre caméra" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {dataCameras.map((camera: CameraData) => (
                    <>
                      <SelectLabel>{camera.brand}</SelectLabel>
                      <SelectItem key={camera.id} value={camera}>
                        {camera.model}
                      </SelectItem>
                    </>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {selectedCamera && (
              <div className="pb-6 pt-6">
                <p>
                  {selectedCamera.brand} {selectedCamera.model}
                </p>
                <p>
                  Capteur : {selectedCamera.sensor} Type de capteur :{" "}
                  {selectedCamera.sensor_type}
                </p>
                <p>
                  Fps : {selectedCamera.fps} Taille des pixels:{" "}
                  {selectedCamera.photosites}
                </p>
              </div>
            )}
            <Select
              onValueChange={(value) =>
                handleRefractorSelection(value as unknown as RefractorData)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez votre tube" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {dataRefractors.map((refractor: RefractorData) => (
                    <>
                      <SelectLabel>{refractor.brand}</SelectLabel>
                      <SelectItem key={refractor.id} value={refractor}>
                        {refractor.model}
                      </SelectItem>
                    </>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {selectedRefractor && (
              <div className="pb-6 pt-6">
                <p>
                  {selectedRefractor.brand} {selectedRefractor.model}
                </p>
                <p>
                  Diametre:{" "}
                  <span className="font-bold">
                    {selectedRefractor.diameter}
                  </span>
                </p>
                <p>
                  {barlowSize > 1 ? (
                    <p className="text-blue-600">
                      Focale avec barlow * {barlowSize} :{" "}
                      {selectedRefractor.focal * barlowSize}
                    </p>
                  ) : (
                    `Focale : ${selectedRefractor.focal}`
                  )}
                </p>
                <p>
                  {barlowSize > 1 ? (
                    <p className="text-blue-600">
                      Rapport F/D avec barlow * {barlowSize} :{" "}
                      {selectedRefractor.focal_ratio * barlowSize}
                    </p>
                  ) : (
                    `Rapport F/D : ${selectedRefractor.focal_ratio}`
                  )}
                </p>
                <p>
                  Resolution du tube :{" "}
                  <span className="font-bold">{resolution}</span>
                </p>
              </div>
            )}
            <div className="flex">
              <Select
                onValueChange={(value) =>
                  handleWavelengthSelection(value as unknown as WavelengthData)
                }
                defaultValue={() => setSelectedWavelength(dataWavelength[3])}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="vert - 550" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {dataWavelength.map((wavelength: WavelengthData) => (
                      <>
                        <SelectItem key={wavelength.id} value={wavelength}>
                          {wavelength.color} - {wavelength.value}
                        </SelectItem>
                      </>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div>
                <Input
                  className="w-[90px]"
                  onChange={handleTurbulence}
                  type="text"
                  id="turbulence"
                  placeholder="Turbu 1.0"
                />
              </div>
              <div>
                <Input
                  className="w-[90px]"
                  onChange={handleBarlowSize}
                  type="text"
                  id="barlow"
                  placeholder="Barlow 1.0"
                />
              </div>
            </div>
            {selectedRefractor && selectedCamera && (
              <>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center text-red-400">
                        Largeur '
                      </TableHead>
                      <TableHead className="text-center text-red-400">
                        Hauteur '
                      </TableHead>
                      <TableHead className="text-center text-red-400">
                        Diagonale '
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="text-center font-bold">
                      <TableCell>{widthMinuteCalculationResult}</TableCell>
                      <TableCell>{heightMinuteCalculationResult}</TableCell>
                      <TableCell>{diagonalMinuteCalculationResult}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center text-red-400">
                        Largeur "
                      </TableHead>
                      <TableHead className="text-center text-red-400">
                        Hauteur "
                      </TableHead>
                      <TableHead className="text-center text-red-400">
                        Diagonale "
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="text-center font-bold">
                      <TableCell>{widthSecondCalculationResult}</TableCell>
                      <TableCell>{heightSecondCalculationResult}</TableCell>
                      <TableCell>{diagonalSecondCalculationResult}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center text-red-400">
                        Echantillonage (" / pixel)
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="text-center font-bold">
                      <TableCell>{sampleCalculationResult}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center text-red-400">
                        Echantillonage idéal
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="text-center font-bold">
                      <TableCell>{idealSample()}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-center text-red-400">
                        Echantillonage actuel
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="text-center font-bold">
                      <TableCell>{resultSampling()}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default Sampling;
