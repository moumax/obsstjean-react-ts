import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog.tsx'
import { Button } from '@/components/ui/button.tsx'

interface Image {
  imageName: string
  title: string
  description: string
}

interface DisplayAllImagesProps {
  userName: string
  images: Image[]
  onClose: () => void
  title: string
  description: string
}
function DisplayAllImages(props: DisplayAllImagesProps) {
  return (
    <Dialog open={true} onOpenChange={props.onClose}>
      <DialogContent className=' bg-blue-900 min-w-[90%]'>
        <DialogHeader>
          <DialogTitle className='mb-5 text-white/50 text-center text-2xl'>
            Gallerie photo de {props.userName}
          </DialogTitle>
        </DialogHeader>
        <div className='flex flex-col justify-center items-center'>
          {props.images &&
            props.images.map((image: Image, index: number) => (
              <div
                className='relative mb-2 w-full flex flex-col justify-center items-center'
                key={index}
              >
                <a
                  href={`${import.meta.env.VITE_BACKEND_URL}/${props.userName}/original_${image.imageName}`}
                  target='_blank'
                  className='w-full'
                >
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${props.userName}/${image.imageName}`}
                    alt={`Image ${index}`}
                    className='relative w-full'
                  />
                </a>
                <div className='absolute top-0 pl-36 px-2  text-primaryYellow opacity-70'>
                  <p className=''>{image.title}</p>
                </div>
                <div className='absolute bottom-0 px-2 text-white opacity-70 text-xs'>
                  <p className='mt-3' style={{ wordWrap: 'break-word' }}>
                    {image.description}
                  </p>
                </div>
              </div>
            ))}
        </div>
        <DialogFooter>
          <DialogClose
            onClick={props.onClose}
            className='w-full h-10 rounded-md bg-red-400 text-white'
          >
            Fermer
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DisplayAllImages
