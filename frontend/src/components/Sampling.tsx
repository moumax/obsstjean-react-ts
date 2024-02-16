import { useState } from "react";
import useSWR from "swr";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
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

function Sampling() {
  type CameraData = {
    id: number;
    brand: string;
    model: string;
    sensor: string;
    sensor_type: string;
    sensor_width_mm: number;
    sensor_heigth_mm: number;
    sensor_width_pixel: number;
    sensor_height_pixel: number;
    photosites: number;
    megapixels: number;
    fps: number;
    dynamic: number;
    bits: number;
    pixel_capaoity: number;
    cooler: number;
  };

  type RefractorData = {
    id: number;
    brand: string;
    model: string;
    diameter: number;
    focal: number;
    focal_ratio: number;
    resolution: number;
  }

  const [selectedCamera, setSelectedCamera] = useState<CameraData | null>(null);
  const [selectedRefractor, setSelectedRefractor] = useState<RefractorData | null>(null);

  const { data: dataCameras, error: errorCameras, isLoading: isLoadingCameras } = useSWR(
    `${import.meta.env.VITE_BACKEND_URL}/api/cameras/`,
    callAPI
  );

  const { data: dataRefractors, error: errorRefractors, isLoading: isLoadingRefractors } = useSWR(
    `${import.meta.env.VITE_BACKEND_URL}/api/refractors/`,
    callAPI
  );

  console.log({ selectedCamera });
  console.log({ selectedRefractor })

  const handleCameraSelection = (camera: CameraData) => {
    setSelectedCamera(camera);
  };

  const handleRefractorSelection = (refractor: RefractorData) => {
    setSelectedRefractor(refractor);
  };

  if (errorCameras) return `Erreur lors du chargement : ${errorCameras.message}`;
  if (isLoadingCameras) return "chargement en cours...";

  if (errorRefractors) return `Erreur lors du chargement : ${errorRefractors.message}`;
  if (isLoadingRefractors) return "chargement en cours...";

  const calcul = () => {
    return selectedRefractor?.focal + selectedCamera?.fps
  }

  return (
    <Dialog>
      <DialogTrigger className="bg-white">Calculateur de focale</DialogTrigger>
      <DialogContent className="z-50">
        <DialogHeader>
          <DialogTitle>Calculateur d'échantillonage</DialogTitle>
          <DialogDescription>
            Sélectionne une monture puis une caméra pour savoir si la configuration est adéquate.
            <Select onValueChange={(value) => handleCameraSelection(value as CameraData)}>
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
            {
              selectedCamera && (
                <div>
                  <p>Marque : {selectedCamera.brand}</p>
                  <p>Modèle : {selectedCamera.model}</p>
                  {/* Affichez toutes les données de la caméra ici */}
                  {/* Par exemple : */}
                  <p>Capteur : {selectedCamera.sensor}</p>
                  <p>Type de capteur : {selectedCamera.sensor_type}</p>

                  <p>Fps : {selectedCamera.fps}</p>
                  {/* Ajoutez d'autres propriétés selon vos besoins */}
                </div>
              )
            }
            <Select onValueChange={(value) => handleRefractorSelection(value as RefractorData)}>
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
            {
              selectedRefractor && (
                <div>
                  <p>Marque : {selectedRefractor.brand}</p>
                  <p>Modèle : {selectedRefractor.model}</p>
                  <p>Diametre: {selectedRefractor.diameter}</p>
                  <p>Focale : {selectedRefractor.focal}</p>
                  <p>Rapport F/D : {selectedRefractor.focal_ratio}</p>
                  <p>Resolution du tube : {selectedRefractor.resolution}</p>
                </div>
              )
            }
            <h2>{calcul()}</h2>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog >
  );
}

export default Sampling;