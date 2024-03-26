import callAPI from '@/api/callAPI'
import useSWR from 'swr'
import DisplayOnePhoto from '../photos/DisplayOnePhoto'
import { useEffect, useState } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/shad/carousel'
import { LoadingSpinner } from '@/components/ui/shad/loader'

interface ImageData {
  imagePath: string
  imageName: string
  description: string
  title: string
  owner: string
}

const DisplaySelectorGallery = () => {
  const {
    data: responseData,
    error: fetchError,
    isLoading: isLoadingData
  } = useSWR<ImageData[]>(
    `${import.meta.env.VITE_BACKEND_URL}/api/gallery/`,
    callAPI
  )

  const [randomImages, setRandomImages] = useState<ImageData[]>([])
  const [imagesByUser, setImagesByUser] = useState<Record<string, ImageData[]>>(
    {}
  )

  useEffect(() => {
    if (responseData) {
      const images: Record<string, ImageData[]> = {}
      responseData.forEach(image => {
        const owner = image.owner
        if (!images[owner]) {
          images[owner] = []
        }
        images[owner].push(image)
      })
      setImagesByUser(images)

      const randomImagesArray: ImageData[] = []
      Object.values(images).forEach(userImages => {
        const nonOriginalImages = userImages.filter(
          image => !image.imageName.startsWith('original_')
        )
        if (nonOriginalImages.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * nonOriginalImages.length
          )
          randomImagesArray.push(nonOriginalImages[randomIndex])
        }
      })
      setRandomImages(randomImagesArray)
    }
  }, [responseData])

  if (fetchError) {
    return (
      <div className='text-white'>
        Erreur lors de la récupération des données
      </div>
    )
  }

  if (isLoadingData) {
    return <LoadingSpinner size={72} />
  }

  return (
    <section className='flex items-center justify-center'>
      <Carousel className='w-full'>
        <CarouselContent>
          {randomImages.map((image, index) => (
            <DisplayOnePhoto
              key={index}
              id={index}
              allImages={imagesByUser[image.owner]}
              imageName={image.imageName}
              userName={image.owner}
              description={image.description}
              title={image.title}
            />
          ))}
        </CarouselContent>
        <CarouselPrevious className=' mx-16 my-2 text-primaryYellow bg-transparent' />
        <CarouselNext className='mx-16 my-2 text-primaryYellow bg-transparent' />
      </Carousel>
    </section>
  )
}

export default DisplaySelectorGallery
