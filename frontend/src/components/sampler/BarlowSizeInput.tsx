import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface BarlowSizeInputProps {
  handleBarlowSize: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const BarlowSizeInput: React.FC<BarlowSizeInputProps> = ({
  handleBarlowSize,
}) => {
  return (
    <div className="flex flex-col items-center gap-y-2">
      <Label className="text-black-400">Barlow</Label>
      <Input
        className="w-[90px] placeholder:text-center"
        onChange={handleBarlowSize}
        type="text"
        id="barlow"
        placeholder="1.0"
      />
    </div>
  );
};
