import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { SkyObjectData } from "@/types/types";

interface SkyObjectsSelectorProps {
  dataSkyObjects: SkyObjectData[];
  selectedSkyObjects: SkyObjectData | null;
  handleSkyObjectsSelection: (skyobject: SkyObjectData) => void;
  pixelObjectSize: number;
}

export const SkyObjectsSelector: React.FC<SkyObjectsSelectorProps> = ({
  dataSkyObjects,
  selectedSkyObjects,
  handleSkyObjectsSelection,
  pixelObjectSize,
}) => {
  return (
    <>
      <Select
        onValueChange={(value) =>
          handleSkyObjectsSelection(value as unknown as SkyObjectData)
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Sélectionnez un objet du ciel" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {dataSkyObjects.map((objects: SkyObjectData) => (
              <>
                <SelectItem key={objects.id} value={objects}>
                  {objects.object} - {objects.size}
                </SelectItem>
              </>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {selectedSkyObjects && (
        <div className="pb-6 pt-6 text-gray-400">
          <p>
            {selectedSkyObjects.object} mesurera environ {pixelObjectSize}{" "}
            pixels sur ton image
          </p>
        </div>
      )}
    </>
  );
};
