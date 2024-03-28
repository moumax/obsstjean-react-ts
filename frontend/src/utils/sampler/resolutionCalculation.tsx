import { RefractorData, WavelengthData } from '@/types/types'

export const resolutionCalculation = (
  selectedWavelength: WavelengthData | null,
  selectedRefractor: RefractorData | null
): number => {
  if (selectedWavelength && selectedWavelength.value && selectedRefractor) {
    const resolution: number = +(
      (0.25164 * selectedWavelength.value) /
      selectedRefractor.diameter
    ).toFixed(5)
    return resolution
  } else {
    return 0
  }
}

export const resolutionCalculationWithBarlow = (
  selectedWavelength: WavelengthData | null,
  selectedRefractor: RefractorData | null
) => {
  if (selectedWavelength && selectedWavelength.value && selectedRefractor) {
    const resolution: number = +(
      (0.25164 * selectedWavelength.value) /
      selectedRefractor.diameter
    ).toFixed(5)

    if (0.5 * resolution < 1) {
      return (0.5 * resolution).toFixed(2)
    } else if (0.5 * resolution < 10) {
      return (0.5 * resolution).toFixed(1)
    } else {
      return (0.5 * resolution).toFixed(0)
    }
  }
}
