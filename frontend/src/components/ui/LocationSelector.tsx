import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select.tsx'
import useSWR from 'swr'
import callAPI from '@/api/callAPI'
import { LoadingSpinner } from './loader'

interface Location {
  id: number
  location: string
}

interface LocationSelectorProps {
  onSelectLocation: (location: string) => void
  defaultLocation?: string
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  onSelectLocation,
  defaultLocation
}) => {
  const {
    data: locations,
    error: errorLocation,
    isValidating
  } = useSWR<Location[]>(
    `${import.meta.env.VITE_BACKEND_URL}/api/locations/`,
    callAPI
  )

  if (errorLocation)
    return (
      <div className='text-white'>
        Erreur lors du chargement : {errorLocation.message}
      </div>
    )
  if (!locations || isValidating) return <LoadingSpinner size={72} />

  return (
    <Select onValueChange={value => onSelectLocation(value)}>
      <SelectTrigger className='bg-primaryInput'>
        <SelectValue
          defaultValue={defaultLocation}
          placeholder="Lieu de l'évènement"
        />
      </SelectTrigger>
      <SelectContent className='w-min bg-primaryInput'>
        <SelectGroup>
          {locations.map(location => (
            <SelectItem
              className='text-xs bg-blue-100'
              key={location.id}
              value={location.location}
            >
              {location.location}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default LocationSelector
