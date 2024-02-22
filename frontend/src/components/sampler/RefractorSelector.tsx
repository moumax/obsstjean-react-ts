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
import { RefractorData } from "@/types/types";

interface RefractorSelectorProps {
  dataRefractors: RefractorData[];
  selectedRefractor: RefractorData | null;
  handleRefractorSelection: (refractor: RefractorData) => void;
  barlowSize: number;
  resolution: number;
}

export const RefractorSelector: React.FC<RefractorSelectorProps> = ({
  dataRefractors,
  selectedRefractor,
  handleRefractorSelection,
  barlowSize,
  resolution,
}) => {
  return (
    <>
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
                  {refractor.brand} - {refractor.model}
                </SelectItem>
              </>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {selectedRefractor && (
        <div className="pb-6 pt-6 text-gray-400">
          <p>
            Diametre:{" "}
            <span className="font-bold">{selectedRefractor.diameter}</span>
          </p>
          <p>
            {barlowSize > 1 ? (
              <p className="text-green-600">
                Focale avec barlow * {barlowSize} :{" "}
                {selectedRefractor.focal * barlowSize}
              </p>
            ) : (
              `Focale : ${selectedRefractor.focal}`
            )}
          </p>
          <p>
            {barlowSize > 1 ? (
              <p className="text-green-600">
                Rapport F/D avec barlow * {barlowSize} :{" "}
                {selectedRefractor.focal_ratio * barlowSize}
              </p>
            ) : (
              `Rapport F/D : ${selectedRefractor.focal_ratio}`
            )}
          </p>
          <p>
            Resolution du tube : <span className="font-bold">{resolution}</span>
          </p>
        </div>
      )}
    </>
  );
};
