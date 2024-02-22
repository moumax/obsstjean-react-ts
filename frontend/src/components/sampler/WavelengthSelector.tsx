import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { WavelengthData } from "@/types/types";
import { Label } from "../ui/label";

interface WavelengthSelectorProps {
  dataWavelength: WavelengthData[];
  setSelectedWavelength: WavelengthData;
  handleWavelengthSelection: (wavelength: WavelengthData) => void;
}

export const WavelengthSelector: React.FC<WavelengthSelectorProps> = ({
  dataWavelength,
  setSelectedWavelength,
  handleWavelengthSelection,
}) => {
  return (
    <>
      <Label className="text-black-400">Filtre</Label>
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
    </>
  );
};
