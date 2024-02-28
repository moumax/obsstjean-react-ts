import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import useSWR from "swr";
import callAPI from "@/api/callAPI";

interface Location {
  id: number;
  location: string;
}

interface LocationSelectorProps{
  onSelectLocation: (location: string) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ onSelectLocation }) => {

const { data: locations, error: errorLocation, isValidating } = useSWR<Location[]>(
    `${import.meta.env.VITE_BACKEND_URL}/api/locations/`,
    callAPI
  );

  if (errorLocation)
    return `Erreur lors du chargement : ${errorLocation.message}`;
  if (!locations || isValidating) return "Chargement en cours...";

  return (
    <Select onValueChange={(value) => onSelectLocation(value)}>
      <SelectTrigger>
        <SelectValue placeholder="Lieu de l'évènement" />
      </SelectTrigger>
      <SelectContent className="w-min">
        <SelectGroup>
          {locations.map((location) => (
            <SelectItem
              className="text-xs bg-blue-100"
              key={location.id}
              value={location.location}
            >
              {location.location}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LocationSelector;
