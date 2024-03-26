import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/shad/select'
import { SkyObjectData } from '@/types/types'

interface SkyObjectsSelectorProps {
  dataSkyObjects: SkyObjectData[]
  selectedSkyObjects: SkyObjectData | null
  handleSkyObjectsSelection: (skyobject: SkyObjectData) => void
  pixelObjectSize: number
}

export const SkyObjectsSelector: React.FC<SkyObjectsSelectorProps> = ({
  dataSkyObjects,
  selectedSkyObjects,
  handleSkyObjectsSelection,
  pixelObjectSize
}) => {
  return (
    <>
      <Select
        onValueChange={(value: SkyObjectData) =>
          handleSkyObjectsSelection(value)
        }
      >
        <SelectTrigger className='bg-primaryInput'>
          <SelectValue placeholder='Sélectionnez un objet du ciel' />
        </SelectTrigger>
        <SelectContent className='bg-primaryInput'>
          <SelectGroup>
            {dataSkyObjects.map((object: SkyObjectData) => (
              <>
                <SelectItem key={object.id} value={object}>
                  {object.object} - {object.size}
                </SelectItem>
              </>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {selectedSkyObjects && (
        <div className='pb-6 pt-6 text-gray-400'>
          <p>
            {selectedSkyObjects.object} mesurera environ {pixelObjectSize}{' '}
            pixels sur ton image
          </p>
        </div>
      )}
    </>
  )
}
