import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { CameraData } from "@/types/types";

interface CameraSelectorProps {
  dataCameras: CameraData[];
  selectedCamera: CameraData | null;
  handleCameraSelection: (camera: CameraData) => void;
}

export const CameraSelector: React.FC<CameraSelectorProps> = ({
  dataCameras,
  selectedCamera,
  handleCameraSelection,
}) => {
  return (
    <>
      <Select
        onValueChange={(value) =>
          handleCameraSelection(value as unknown as CameraData)
        }
      >
        <SelectTrigger className="mt-6">
          <SelectValue placeholder="Sélectionnez votre caméra" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {dataCameras.map((camera: CameraData) => (
              <React.Fragment key={camera.id}>
                <SelectLabel>{camera.brand}</SelectLabel>
                <SelectItem key={camera.id} value={camera}>
                  {camera.brand} - {camera.model}
                </SelectItem>
              </React.Fragment>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {selectedCamera && (
        <div className="pb-6 pt-6 text-gray-400">
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
    </>
  );
};
