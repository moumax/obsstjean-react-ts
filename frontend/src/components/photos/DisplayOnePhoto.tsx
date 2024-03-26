import { useState } from 'react'
import { CarouselItem } from '@/components/ui/shad/carousel'
import DisplayAllPhotos from './DisplayAllPhotos'

interface Image {
  imageName: string
  title: string
  description: string
}

interface DisplayOnePhotoProps {
  id: number
  userName: string
  imageName: string
  title: string
  description: string
  allImages: Image[]
}

function DisplayOnePhoto(props: DisplayOnePhotoProps) {
  const [showGallery, setShowGallery] = useState(false)

  const handleGalleryOpen = () => {
    setShowGallery(true)
  }

  const handleGalleryClose = () => {
    setShowGallery(false)
  }

  return (
    <>
      <CarouselItem
        onClick={handleGalleryOpen}
        className='flex flex-col items-center justify-center'
      >
        <div className='mb-2 text-center text-white/40 text-sm'>
          Clique sur l'image pour voir la galerie de{' '}
          <span className='text-yellow-400'>{props.userName}</span>
        </div>
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/${props.userName}/${props.imageName}`}
          alt={props.title}
          className='w-full rounded-3xl mt-3'
        />
      </CarouselItem>
      {showGallery && (
        <DisplayAllPhotos
          userName={props.userName}
          images={props.allImages}
          onClose={handleGalleryClose}
          title={props.title}
          description={props.description}
        />
      )}
    </>
  )
}

export default DisplayOnePhoto
