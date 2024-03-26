import { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/shad/select'
import { RefractorData } from '@/types/types'

interface RefractorSelectorProps {
  dataRefractors: RefractorData[]
  selectedRefractor: RefractorData | null
  handleRefractorSelection: (refractor: RefractorData) => void
  barlowSize: number
  resolution: number
}

export const RefractorSelector: React.FC<RefractorSelectorProps> = ({
  dataRefractors,
  selectedRefractor,
  handleRefractorSelection,
  barlowSize,
  resolution
}) => {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null)

  const handleBrandSelection = (brand: string) => {
    setSelectedBrand(brand)
  }

  const handleModelSelection = (model: string) => {
    const selectedRefractor = dataRefractors.find(
      refractor =>
        refractor.brand === selectedBrand && refractor.model === model
    )
    if (selectedRefractor) {
      handleRefractorSelection(selectedRefractor)
    }
  }

  const uniqueBrands = Array.from(
    new Set(dataRefractors.map(refractor => refractor.brand))
  )

  const modelsForSelectedBrand = selectedBrand
    ? dataRefractors
        .filter(refractor => refractor.brand === selectedBrand)
        .map(refractor => refractor.model)
    : []

  return (
    <>
      <div className='flex gap-2'>
        <Select onValueChange={value => handleBrandSelection(value as string)}>
          <SelectTrigger className='mt-6 bg-primaryInput text-xs'>
            <SelectValue placeholder='Marque tube' className='text-xs' />
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
              <SelectValue placeholder='Modèle tube' />
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

      {selectedRefractor && (
        <div className='pb-6 pt-6 text-gray-400'>
          <p>
            Diametre:{' '}
            <span className='font-bold'>{selectedRefractor.diameter}</span>
          </p>
          <p>
            {barlowSize > 1 ? (
              <p className='text-green-600'>
                Focale avec barlow * {barlowSize} :{' '}
                {selectedRefractor.focal * barlowSize}
              </p>
            ) : (
              `Focale : ${selectedRefractor.focal}`
            )}
          </p>
          <p>
            {barlowSize > 1 ? (
              <p className='text-green-600'>
                Rapport F/D avec barlow * {barlowSize} :{' '}
                {selectedRefractor.focal_ratio * barlowSize}
              </p>
            ) : (
              `Rapport F/D : ${selectedRefractor.focal_ratio}`
            )}
          </p>
          <p>
            Resolution du tube : <span className='font-bold'>{resolution}</span>
          </p>
        </div>
      )}
    </>
  )
}
