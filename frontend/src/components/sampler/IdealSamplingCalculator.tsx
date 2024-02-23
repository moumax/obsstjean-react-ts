import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface IdealSamplingCalculatorProps {
  sampleCalculationResult: number;
  idealSample: () => number;
}

export const IdealSamplingCalculator: React.FC<
  IdealSamplingCalculatorProps
> = ({ sampleCalculationResult, idealSample }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center text-yellow-400">
            Echantillonage (" / pixel)
          </TableHead>
          <TableHead className="text-center text-yellow-400">
            Echantillonage idéal
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="text-center font-bold">
          <TableCell>{sampleCalculationResult}</TableCell>
          <TableCell>{idealSample()}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};