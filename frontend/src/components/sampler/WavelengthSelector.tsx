import { WavelengthData } from '@/types/types'
import { Label } from '@/components/ui/shad/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/shad/select'

interface WavelengthSelectorProps {
  dataWavelength: WavelengthData[]
  setSelectedWavelength: React.Dispatch<
    React.SetStateAction<WavelengthData | null>
  >
  handleWavelengthSelection: (wavelength: WavelengthData) => void
}

export const WavelengthSelector: React.FC<WavelengthSelectorProps> = ({
  dataWavelength,
  setSelectedWavelength,
  handleWavelengthSelection
}) => {
  return (
    <>
      <Label className='text-black-400'>Filtre</Label>
      <Select
        onValueChange={(value: unknown) => {
          if (value && typeof value !== 'string') {
            handleWavelengthSelection(value as WavelengthData)
          }
        }}
        defaultValue={() => setSelectedWavelength(dataWavelength[3])}
      >
        <SelectTrigger className='bg-primaryInput text-xs'>
          <SelectValue placeholder='vert - 550' />
        </SelectTrigger>
        <SelectContent className='bg-primaryInput'>
          <SelectGroup>
            {dataWavelength.map((wavelength: WavelengthData) => (
              <SelectItem key={wavelength.id} value={wavelength}>
                {wavelength.color} - {wavelength.value}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}
