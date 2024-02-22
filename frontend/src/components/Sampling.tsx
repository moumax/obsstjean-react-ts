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
import {
  CameraData,
  RefractorData,
  WavelengthData,
  SkyObjectData,
} from "@/types/types";
import { CameraSelector } from "./sampler/CameraSelector";
import { RefractorSelector } from "./sampler/RefractorSelector";
import { MinuteCalculator } from "./sampler/MinuteCalculator";
import { SecondCalculator } from "./sampler/SecondCalculator";
import { SkyObjectsSelector } from "./sampler/SkyObjectsSelector";
import { ActualSamplingCalculator } from "./sampler/ActualSamplingCalculator";
import { IdealSamplingCalculator } from "./sampler/IdealSamplingCalculator";
import { WavelengthSelector } from "./sampler/WavelengthSelector";
import { TurbulenceInput } from "./sampler/TurbulenceInput";
import { BarlowSizeInput } from "./sampler/BarlowSizeInput";

function Sampling() {
  const [turbulence, setTurbulence] = useState(1);
  const [barlowSize, setBarlowSize] = useState(1);
  const [selectedCamera, setSelectedCamera] = useState<CameraData | null>(null);
  const [selectedRefractor, setSelectedRefractor] =
    useState<RefractorData | null>(null);
  const [selectedWavelength, setSelectedWavelength] =
    useState<WavelengthData | null>(null);
  const [selectedSkyObjects, setSelectedSkyObjects] =
    useState<SkyObjectData | null>(null);

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

  const {
    data: dataSkyObjects,
    error: errorSkyObjects,
    isLoading: isLoadingSkyObjects,
  } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/api/skyobjects/`, callAPI);

  const handleCameraSelection = (camera: CameraData) => {
    setSelectedCamera(camera);
  };

  const handleRefractorSelection = (refractor: RefractorData) => {
    setSelectedRefractor(refractor);
  };

  const handleWavelengthSelection = (wavelength: WavelengthData) => {
    setSelectedWavelength(wavelength);
  };

  const handleSkyObjectsSelection = (objects: SkyObjectData) => {
    setSelectedSkyObjects(objects);
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

  if (errorSkyObjects)
    return `Erreur lors du chargement : ${errorSkyObjects.message}`;
  if (isLoadingSkyObjects) return "chargement en cours...";

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

  const pixelObjectSize =
    selectedSkyObjects &&
    typeof selectedSkyObjects.angle === "number" &&
    sampleCalculationResult !== 0
      ? (selectedSkyObjects.angle / sampleCalculationResult).toFixed(0)
      : "";

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
      <DialogContent className="z-50 bg-[#072449]">
        <DialogHeader>
          <DialogTitle className="text-center text-yellow-400">
            Calculateur d'échantillonage
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Sélectionne une monture puis une caméra pour savoir si la
            configuration est adéquate.
            <CameraSelector
              dataCameras={dataCameras}
              selectedCamera={selectedCamera}
              handleCameraSelection={handleCameraSelection}
            />
            <RefractorSelector
              dataRefractors={dataRefractors}
              selectedRefractor={selectedRefractor}
              handleRefractorSelection={handleRefractorSelection}
              barlowSize={barlowSize}
              resolution={resolution}
            />
            <div className="mb-5 flex justify-between gap-1">
              <div className="flex flex-col items-center gap-y-2">
                <WavelengthSelector
                  dataWavelength={dataWavelength}
                  setSelectedWavelength={setSelectedWavelength}
                  handleWavelengthSelection={handleWavelengthSelection}
                />
              </div>
              <TurbulenceInput handleTurbulence={handleTurbulence} />
              <BarlowSizeInput
                handleBarlowSize={handleBarlowSize}
                barlowSize={barlowSize}
              />
            </div>
            {selectedRefractor && selectedCamera && (
              <>
                <MinuteCalculator
                  widthMinuteCalculationResult={widthMinuteCalculationResult}
                  heightMinuteCalculationResult={heightMinuteCalculationResult}
                  diagonalMinuteCalculationResult={
                    diagonalMinuteCalculationResult
                  }
                />
                <SecondCalculator
                  widthSecondCalculationResult={widthSecondCalculationResult}
                  heightSecondCalculationResult={heightSecondCalculationResult}
                  diagonalSecondCalculationResult={
                    diagonalSecondCalculationResult
                  }
                />
                <IdealSamplingCalculator
                  sampleCalculationResult={sampleCalculationResult}
                  idealSample={idealSample}
                />
                <ActualSamplingCalculator resultSampling={resultSampling} />
                <SkyObjectsSelector
                  dataSkyObjects={dataSkyObjects}
                  selectedSkyObjects={selectedSkyObjects}
                  handleSkyObjectsSelection={handleSkyObjectsSelection}
                  pixelObjectSize={pixelObjectSize}
                />
              </>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default Sampling;
