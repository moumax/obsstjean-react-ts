import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select.tsx'
import { CameraData } from '@/types/types'

interface CameraSelectorProps {
  dataCameras: CameraData[]
  selectedCamera: CameraData | null
  handleCameraSelection: (camera: CameraData) => void
}

export const CameraSelector: React.FC<CameraSelectorProps> = ({
  dataCameras,
  selectedCamera,
  handleCameraSelection
}) => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)

  const handleBrandSelection = (brand: string) => {
    setSelectedBrand(brand)
  }

  const handleModelSelection = (model: string) => {
    const selectedCamera = dataCameras.find(
      camera => camera.brand === selectedBrand && camera.model === model
    )
    if (selectedCamera) {
      handleCameraSelection(selectedCamera)
    }
  }

  const uniqueBrands = Array.from(
    new Set(dataCameras.map(camera => camera.brand))
  )

  const modelsForSelectedBrand = selectedBrand
    ? dataCameras
        .filter(camera => camera.brand === selectedBrand)
        .map(camera => camera.model)
    : []

  return (
    <>
      <div className='flex gap-2'>
        <Select onValueChange={value => handleBrandSelection(value as string)}>
          <SelectTrigger className='mt-6 bg-primaryInput text-xs'>
            <SelectValue placeholder='Marque caméra' />
          </SelectTrigger>
          <SelectContent className='bg-primaryInput'>
            <SelectGroup>
              {uniqueBrands.map((brand: string) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {selectedBrand && (
          <Select
            onValueChange={value => handleModelSelection(value as string)}
          >
            <SelectTrigger className='mt-6 bg-primaryInput text-xs'>
              <SelectValue placeholder='Modèle caméra' />
            </SelectTrigger>
            <SelectContent className='bg-primaryInput'>
              <SelectGroup>
                {modelsForSelectedBrand.map((model: string) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      </div>

      {selectedCamera && (
        <div className='pb-6 pt-6 text-gray-400'>
          <p>Capteur: {selectedCamera.sensor} </p>
          <p>Type de capteur: {selectedCamera.sensor_type}</p>
          <p>Fps: {selectedCamera.fps}</p>
          <p>Taille des pixels: {selectedCamera.photosites}</p>
        </div>
      )}
    </>
  )
}
