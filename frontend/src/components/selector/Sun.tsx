import { useState } from 'react'
import { LoadingSpinner } from '@/components/ui/shad/loader'

function Sun() {
  const [isLoading, setIsLoading] = useState([true, true])

  const handleImageLoad = (index: number) => {
    setIsLoading(prev => {
      const newState = [...prev]
      newState[index] = false
      return newState
    })
  }

  return (
    <div>
      {isLoading.map((loading, index: number) => (
        <div className='flex justify-center' key={index}>
          {loading && <LoadingSpinner size={72} />}
          <img
            className='rounded-2xl'
            src={
              index === 0
                ? 'https://www.spaceweatherlive.com/images/SDO/SDO_HMIIF_1024.jpg'
                : 'https://sdo.gsfc.nasa.gov/assets/img/latest/latest_1024_0304.jpg'
            }
            onLoad={() => handleImageLoad(index)}
            style={{ display: loading ? 'none' : 'block' }}
          />
        </div>
      ))}
    </div>
  )
}

export default Sun
