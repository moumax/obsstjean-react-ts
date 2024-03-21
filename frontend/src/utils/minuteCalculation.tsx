import { RefractorData, CameraData } from '@/types/types'

let widthMinute: any = 0
let heightMinute: any = 0
let diagonalMinute: any = 0

export const widthMinuteCalculation = (
  selectedRefractor: RefractorData | null,
  selectedCamera: CameraData | null
) => {
  if (selectedRefractor && selectedCamera) {
    const tan = Math.atan(
      selectedCamera.sensor_width_mm / (2 * selectedRefractor.focal)
    )
    const res = 2 * tan
    widthMinute = ((res * 114.6 * 60) / 2).toFixed(4)
    return widthMinute
  } else {
    return (
      <div className='pb-10 pt-10'>
        Tu dois sélectionner une caméra ainsi qu'un tube optique !
      </div>
    )
  }
}

export const heightMinuteCalculation = (
  selectedRefractor: RefractorData | null,
  selectedCamera: CameraData | null
) => {
  if (selectedRefractor && selectedCamera) {
    const tan = Math.atan(
      selectedCamera.sensor_height_mm / (2 * selectedRefractor.focal)
    )
    const res = 2 * tan
    heightMinute = ((res * 114.6 * 60) / 2).toFixed(4)
    return heightMinute
  } else {
    return (
      <div className='pb-10 pt-10'>
        Tu dois sélectionner une caméra ainsi qu'un tube optique !
      </div>
    )
  }
}

export const diagonalMinuteCalculation = (
  selectedRefractor: RefractorData | null,
  selectedCamera: CameraData | null
) => {
  if (selectedRefractor && selectedCamera) {
    diagonalMinute = Math.pow(
      widthMinute * widthMinute + heightMinute * heightMinute,
      0.5
    )
    return diagonalMinute.toFixed(4)
  } else {
    return (
      <div className='pb-10 pt-10'>
        Tu dois sélectionner une caméra ainsi qu'un tube optique !
      </div>
    )
  }
}
