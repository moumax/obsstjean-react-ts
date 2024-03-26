import { useState } from 'react'
import useSWR from 'swr'
import callAPI from '@/api/callAPI'
import { sampleCalculation } from '@/utils/sampleCalculation'
import {
  widthMinuteCalculation,
  heightMinuteCalculation,
  diagonalMinuteCalculation
} from '@/utils/minuteCalculation'
import {
  widthSecondCalculation,
  heightSecondCalculation,
  diagonalSecondCalculation
} from '@/utils/secondCalculation'
import { resolutionCalculation } from '@/utils/resolutionCalculation'
import { CameraSelector } from './CameraSelector'
import { RefractorSelector } from './RefractorSelector'
import { MinuteCalculator } from './MinuteCalculator'
import { SecondCalculator } from './SecondCalculator'
import { SkyObjectsSelector } from './SkyObjectsSelector'
import { ActualSamplingCalculator } from './ActualSamplingCalculator'
import { IdealSamplingCalculator } from './IdealSamplingCalculator'
import { WavelengthSelector } from './WavelengthSelector'
import { TurbulenceInput } from './TurbulenceInput'
import { BarlowSizeInput } from './BarlowSizeInput'
import {
  CameraData,
  RefractorData,
  WavelengthData,
  SkyObjectData
} from '@/types/types'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/shad/dialog'
import { LoadingSpinner } from '@/components/ui/shad/loader'

function Sampling() {
  const [turbulence, setTurbulence] = useState(1)
  const [barlowSize, setBarlowSize] = useState(1)
  const [selectedCamera, setSelectedCamera] = useState<CameraData | null>(null)
  const [selectedRefractor, setSelectedRefractor] =
    useState<RefractorData | null>(null)
  const [selectedWavelength, setSelectedWavelength] =
    useState<WavelengthData | null>(null)
  const [selectedSkyObjects, setSelectedSkyObjects] =
    useState<SkyObjectData | null>(null)

  const {
    data: dataCameras,
    error: errorCameras,
    isLoading: isLoadingCameras
  } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/api/cameras/`, callAPI)

  const {
    data: dataRefractors,
    error: errorRefractors,
    isLoading: isLoadingRefractors
  } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/api/refractors/`, callAPI)

  const {
    data: dataWavelength,
    error: errorWavelength,
    isLoading: isLoadingWavelength
  } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/api/wavelength/`, callAPI)

  const {
    data: dataSkyObjects,
    error: errorSkyObjects,
    isLoading: isLoadingSkyObjects
  } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/api/skyobjects/`, callAPI)

  const handleCameraSelection = (camera: CameraData) => {
    setSelectedCamera(camera)
  }

  const handleRefractorSelection = (refractor: RefractorData) => {
    setSelectedRefractor(refractor)
  }

  const handleWavelengthSelection = (wavelength: WavelengthData) => {
    setSelectedWavelength(wavelength)
  }

  const handleSkyObjectsSelection = (skyobjects: SkyObjectData) => {
    setSelectedSkyObjects(skyobjects)
  }

  if (errorCameras)
    return (
      <div className='text-white'>
        Erreur lors du chargement : {errorCameras.message}
      </div>
    )
  if (isLoadingCameras) return <LoadingSpinner size={72} />

  if (errorRefractors)
    return (
      <div className='text-white'>
        Erreur lors du chargement : {errorRefractors.message}
      </div>
    )
  if (isLoadingRefractors) return <LoadingSpinner size={72} />

  if (errorWavelength)
    return (
      <div className='text-white'>
        Erreur lors du chargement : {errorWavelength.message}
      </div>
    )
  if (isLoadingWavelength) return <LoadingSpinner size={72} />

  if (errorSkyObjects)
    return (
      <div className='text-white'>
        Erreur lors du chargement : {errorSkyObjects.message}
      </div>
    )
  if (isLoadingSkyObjects) return <LoadingSpinner size={72} />

  const widthSecondCalculationResult = widthSecondCalculation(
    selectedRefractor,
    selectedCamera
  )

  const heightSecondCalculationResult = heightSecondCalculation(
    selectedRefractor,
    selectedCamera
  )

  const diagonalSecondCalculationResult = diagonalSecondCalculation(
    selectedRefractor,
    selectedCamera
  )

  const widthMinuteCalculationResult = widthMinuteCalculation(
    selectedRefractor,
    selectedCamera
  )

  const heightMinuteCalculationResult = heightMinuteCalculation(
    selectedRefractor,
    selectedCamera
  )

  const diagonalMinuteCalculationResult = diagonalMinuteCalculation(
    selectedRefractor,
    selectedCamera
  )

  const resolutionCalculationResult = resolutionCalculation(
    selectedWavelength,
    selectedRefractor
  )

  const sampleCalculationResult = sampleCalculation(
    selectedRefractor,
    selectedCamera,
    barlowSize
  )

  const pixelObjectSize =
    selectedSkyObjects &&
    typeof selectedSkyObjects.angle === 'number' &&
    sampleCalculationResult !== null &&
    sampleCalculationResult !== 0
      ? (selectedSkyObjects.angle / sampleCalculationResult).toFixed(0)
      : ''

  const resolution = resolutionCalculationResult

  const idealSample = () => {
    let newResolution: number

    if (selectedRefractor && selectedCamera) {
      resolution < turbulence
        ? (newResolution = turbulence)
        : (newResolution = resolution)

      const focalMini =
        (selectedCamera.photosites * 206.26) / (newResolution / 2)
      const focalMaxi =
        (selectedCamera.photosites * 206.26) / (newResolution / 3)
      const focalFdMini =
        (selectedCamera.photosites * 206.26) /
        (newResolution / 2) /
        selectedRefractor.diameter
      const focalFdMaxi =
        (selectedCamera.photosites * 206.26) /
        (newResolution / 3) /
        selectedRefractor.diameter

      return (
        <div>
          <p>
            {focalMini.toFixed(0)} <span>&lt;</span> Focale <span>&lt;</span>{' '}
            {focalMaxi.toFixed(0)}
          </p>
          <p>
            {focalFdMini.toFixed(0)} <span>&lt;</span> F/D <span>&lt;</span>{' '}
            {focalFdMaxi.toFixed(0)}
          </p>
        </div>
      )
    } else {
      return (
        <div className='pb-10 pt-10'>
          Tu dois sélectionner une caméra ainsi qu'un tube optique !
        </div>
      )
    }
  }

  const handleTurbulence = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value)
    setTurbulence(newValue)
  }

  const handleBarlowSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value)
    setBarlowSize(newValue)
  }

  const resultSampling = () => {
    let newResolution: number

    if (selectedRefractor && selectedCamera) {
      resolution < turbulence
        ? (newResolution = turbulence)
        : (newResolution = resolution)

      const focalMini =
        (selectedCamera.photosites * 206.26) / (newResolution / 2)
      const focalMaxi =
        (selectedCamera.photosites * 206.26) / (newResolution / 3)

      const calculation: number = barlowSize * selectedRefractor.focal

      if (calculation < focalMini)
        return <p className='text-red-400'>Sous echantillonnage</p>
      if (calculation > focalMaxi)
        return <p className='text-red-400'>Sur echantillonnage</p>

      return <p className='text-green-400'>Echantillonnage correct</p>
    }
    return null
  }

  return (
    <Dialog>
      <DialogTrigger className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400'>
        <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
          Calcule ton échantillonnage
        </span>
      </DialogTrigger>
      <DialogContent className='z-50 bg-primaryBlue w-full font-Exo flex flex-col border-0'>
        <DialogHeader>
          <DialogTitle className='text-center text-primaryYellow'>
            Calculateur d'échantillonnage
          </DialogTitle>
          <DialogDescription className='text-gray-400'>
            Sélectionne une monture puis une caméra pour savoir si la
            configuration est adéquate.
            <CameraSelector
              dataCameras={dataCameras}
              selectedCamera={selectedCamera}
              handleCameraSelection={handleCameraSelection}
            />
            <RefractorSelector
              dataRefractors={dataRefractors}
              selectedRefractor={selectedRefractor}
              handleRefractorSelection={handleRefractorSelection}
              barlowSize={barlowSize}
              resolution={resolution}
            />
            <div className='mt-5 mb-5 flex justify-between gap-1'>
              <div className='flex flex-col items-center gap-y-2'>
                <WavelengthSelector
                  dataWavelength={dataWavelength}
                  setSelectedWavelength={setSelectedWavelength}
                  handleWavelengthSelection={handleWavelengthSelection}
                />
              </div>
              <TurbulenceInput handleTurbulence={handleTurbulence} />
              <BarlowSizeInput handleBarlowSize={handleBarlowSize} />
            </div>
            {selectedRefractor && selectedCamera && (
              <>
                <MinuteCalculator
                  widthMinuteCalculationResult={widthMinuteCalculationResult}
                  heightMinuteCalculationResult={heightMinuteCalculationResult}
                  diagonalMinuteCalculationResult={
                    diagonalMinuteCalculationResult
                  }
                />
                <SecondCalculator
                  widthSecondCalculationResult={widthSecondCalculationResult}
                  heightSecondCalculationResult={heightSecondCalculationResult}
                  diagonalSecondCalculationResult={
                    diagonalSecondCalculationResult
                  }
                />
                <IdealSamplingCalculator
                  sampleCalculationResult={Number(sampleCalculationResult)}
                  idealSample={idealSample}
                />
                <ActualSamplingCalculator resultSampling={resultSampling} />
                <SkyObjectsSelector
                  dataSkyObjects={dataSkyObjects}
                  selectedSkyObjects={selectedSkyObjects}
                  handleSkyObjectsSelection={handleSkyObjectsSelection}
                  pixelObjectSize={Number(pixelObjectSize)}
                />
              </>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default Sampling
