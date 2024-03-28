import { RefractorData, CameraData } from '@/types/types'

export const sampleCalculation = (
  selectedRefractor: RefractorData | null,
  selectedCamera: CameraData | null,
  barlowSize: number
): number | null => {
  if (selectedRefractor && selectedCamera) {
    const sample =
      (selectedCamera.photosites * 206.26) / selectedRefractor.focal

    const sampleBarlow = sample / barlowSize
    return parseFloat(sampleBarlow.toFixed(4))
  } else {
    return null
  }
}
