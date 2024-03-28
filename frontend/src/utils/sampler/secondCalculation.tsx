import { RefractorData, CameraData } from '@/types/types'

let widthSecond: any = 0
let heightSecond: any = 0
let diagonalSecond: any = 0

export const widthSecondCalculation = (
  selectedRefractor: RefractorData | null,
  selectedCamera: CameraData | null
) => {
  if (selectedRefractor && selectedCamera) {
    const tan = Math.atan(
      selectedCamera.sensor_width_mm / (2 * selectedRefractor.focal)
    )
    const res = 2 * tan
    widthSecond = ((res * 114.6 * 3600) / 2).toFixed(2)
    return widthSecond
  } else {
    return (
      <div className='pb-10 pt-10'>
        Tu dois sélectionner une caméra ainsi qu'un tube optique !
      </div>
    )
  }
}

export const heightSecondCalculation = (
  selectedRefractor: RefractorData | null,
  selectedCamera: CameraData | null
) => {
  if (selectedRefractor && selectedCamera) {
    const tan = Math.atan(
      selectedCamera.sensor_height_mm / (2 * selectedRefractor.focal)
    )
    const res = 2 * tan
    heightSecond = ((res * 114.6 * 3600) / 2).toFixed(2)
    return heightSecond
  } else {
    return (
      <div className='pb-10 pt-10'>
        Tu dois sélectionner une caméra ainsi qu'un tube optique !
      </div>
    )
  }
}

export const diagonalSecondCalculation = (
  selectedRefractor: RefractorData | null,
  selectedCamera: CameraData | null
) => {
  if (selectedRefractor && selectedCamera) {
    diagonalSecond = Math.pow(
      widthSecond * widthSecond + heightSecond * heightSecond,
      0.5
    )
    return diagonalSecond.toFixed(2)
  } else {
    return (
      <div className='pb-10 pt-10'>
        Tu dois sélectionner une caméra ainsi qu'un tube optique !
      </div>
    )
  }
}
