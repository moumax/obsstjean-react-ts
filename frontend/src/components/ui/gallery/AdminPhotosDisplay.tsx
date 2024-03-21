import callAPI from '@/api/callAPI'
import useSWR from 'swr'
import DeletePhoto from './modals/DeletePhoto'
import EditPhotoParams from './modals/EditPhotoParams'
import { LoadingSpinner } from '../loader'

function AdminPhotosDisplay({ username }) {
  const {
    data: responseData,
    error: fetchError,
    isLoading: isLoadingData
  } = useSWR(
    `${import.meta.env.VITE_BACKEND_URL}/api/gallery/${username}`,
    callAPI
  )

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

  const filteredImages = responseData.filter(
    image => !image.imageName.startsWith('original_')
  )

  return (
    <div>
      <h2 className='text-xl text-center mb-7'>Gestion de tes photos</h2>
      {filteredImages.map(image => (
        <div
          key={image.id}
          className='flex flex-col items-center mb-4 text-xs overflow-hidden'
        >
          <div className='relative mb-2'>
            <img
              className='w-40'
              src={`${import.meta.env.VITE_BACKEND_URL}/${username}/${image.imageName}`}
              alt={image.title}
            />
            <div className='absolute top-0 right-0 px-2 opacity-50'>
              <EditPhotoParams
                id={image.id}
                title={image.title}
                description={image.description}
                username={username}
              />
            </div>
            <div className='absolute top-0 right-0 px-10 opacity-50'>
              <DeletePhoto
                id={image.id}
                name={image.title}
                username={username}
                path={image.imagePath}
              />
            </div>
          </div>
          <p className='text-primaryYellow'>{image.title}</p>
          <p style={{ wordWrap: 'break-word' }}>{image.description}</p>
        </div>
      ))}
    </div>
  )
}

export default AdminPhotosDisplay
