import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.tsx";
import { SelectGroup } from "@radix-ui/react-select";

interface Props {
  data: Data[]; // Utilisez simplement le type de vos données de caméra
}

function CardCamera({ data }: Props) {
  return (
    <div>
      <Card className="bg-transparent">
        <CardHeader className="flex flex-row items-center justify-center gap-4 p-0">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez votre caméra" />
            </SelectTrigger>
            <SelectContent>
              {data && data.map(camera => (
                <SelectItem key={camera.id} value={camera.brand}>
                  {camera.brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardHeader>
      </Card>
    </div>
  )
}

export default CardCamera;