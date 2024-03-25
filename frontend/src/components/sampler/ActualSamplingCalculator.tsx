import React from 'react'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table'

interface ActualSamplingCalculatorProps {
  resultSampling: () => number
}

export const ActualSamplingCalculator: React.FC<
  ActualSamplingCalculatorProps
> = ({ resultSampling }) => {
  return (
    <Table className='mb-10 mt-10 flex justify-around rounded-md bg-white/20'>
      <TableHeader>
        <TableRow className='text-center text-primaryYellow'>
          <TableCell>{`Echant. actuel =====>`}</TableCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className='text-center font-bold'>
          <TableCell>{resultSampling()}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
