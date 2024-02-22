import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

interface SecondCalculatorProps {
  widthSecondCalculationResult: number;
  heightSecondCalculationResult: number;
  diagonalSecondCalculationResult: number;
}

export const SecondCalculator: React.FC<SecondCalculatorProps> = ({
  widthSecondCalculationResult,
  heightSecondCalculationResult,
  diagonalSecondCalculationResult,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center text-yellow-400">
            Largeur "
          </TableHead>
          <TableHead className="text-center text-yellow-400">
            Hauteur "
          </TableHead>
          <TableHead className="text-center text-yellow-400">
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
  );
};
