import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/shad/table'

interface IdealSamplingCalculatorProps {
  sampleCalculationResult: number
  idealSample: () => JSX.Element
}

export const IdealSamplingCalculator: React.FC<
  IdealSamplingCalculatorProps
> = ({ sampleCalculationResult, idealSample }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='text-center text-primaryYellow'>
            Echant. (" / pixel)
          </TableHead>
          <TableHead className='text-center text-primaryYellow'>
            Echant. idéal
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className='text-center font-bold'>
          <TableCell>{sampleCalculationResult}</TableCell>
          <TableCell>{idealSample()}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
