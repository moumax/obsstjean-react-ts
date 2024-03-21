import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '../ui/table'

interface MinuteCalculatorProps {
  widthMinuteCalculationResult: number
  heightMinuteCalculationResult: number
  diagonalMinuteCalculationResult: number
}

export const MinuteCalculator: React.FC<MinuteCalculatorProps> = ({
  widthMinuteCalculationResult,
  heightMinuteCalculationResult,
  diagonalMinuteCalculationResult
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='text-center text-primaryYellow'>
            Largeur '
          </TableHead>
          <TableHead className='text-center text-primaryYellow'>
            Hauteur '
          </TableHead>
          <TableHead className='text-center text-primaryYellow'>
            Diagonale '
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className='text-center font-bold'>
          <TableCell>{widthMinuteCalculationResult}</TableCell>
          <TableCell>{heightMinuteCalculationResult}</TableCell>
          <TableCell>{diagonalMinuteCalculationResult}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
