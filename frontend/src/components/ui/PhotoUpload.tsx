import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageTransform from 'filepond-plugin-image-transform'
import FilePondPluginImageResize from 'filepond-plugin-image-resize'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import './filepond.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import { useRef, useState } from 'react'
import { Label } from './label'
import { Input } from './input'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { mutate } from 'swr'
import { toast } from 'sonner'

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondPluginFileValidateType,
  FilePondPluginFileValidateSize
)

function PhotoUpload() {
  const [image, setImage] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const filePondRef = useRef(null)
  const [filesSelected, setFilesSelected] = useState(false)
  const baseURL = 'http://localhost:5000/api/upload/'
  const { userName } = useAuth()

  const handleUpload = () => {
    if (filePondRef.current !== null && image.length > 0) {
      filePondRef.current.processFiles()
    } else {
      console.error('Aucun fichier sélectionné.')
    }
  }

  const handleFileChange = files => {
    setImage(files)
    setFilesSelected(files.length > 0)
  }

  const handleProcessFile = () => {
    setTitle('')
    setDescription('')
    filePondRef.current.removeFiles()
    mutate(`${import.meta.env.VITE_BACKEND_URL}/api/gallery/${userName}`)
    toast.success('Ta photo est sur le serveur !')
  }

  return (
    <div className='mt-4'>
      <h2 className='text-xl text-center mb-7'>Poste tes photos !</h2>
      <div>
        <Label>Titre de la photo</Label>
        <Input
          type='text'
          className='text-black'
          value={title}
          onChange={e => {
            setTitle(e.target.value)
          }}
          placeholder='Titre obligatoire'
        />
        <Label>Description de la photo</Label>
        <Input
          type='text'
          className='text-black'
          value={description}
          onChange={e => {
            setDescription(e.target.value)
          }}
          placeholder='Description obligatoire'
        />
      </div>
      <div className='flex flex-col border border-yellow-400 rounded-md mt-12 mb-12'>
        <FilePond
          labelIdle={`
          <div style="width:100%;height:100%">
            <p>
              Fait glisser ton image ou <span class="filepond--label-action" tabindex="0">cherche sur ton disque dur</span><br>
            </p>
          </div>
        `}
          labelFileProcessingComplete='Buennnoo'
          labelFileProcessing='On bourre le fichier sur le serveur'
          labelMaxFileSizeExceeded='Le fichier est trop balèze...'
          labelMaxFileSize='Le poids du fichier dépasse {filesize}'
          files={image}
          ref={filePondRef}
          credits={false}
          maxFiles={1}
          instantUpload={false}
          name='image'
          allowReorder
          imageTransformVariantsIncludeOriginal
          allowImageResize
          allowImageTransform
          allowFileTypeValidation
          acceptedFileTypes={['image/jpg', 'image/jpeg']}
          allowFileSizeValidation
          maxFileSize='10MB'
          imageResizeTargetWidth={256}
          allowProcess={false}
          server={{
            process: {
              url: baseURL,
              method: 'POST',
              withCredentials: true,
              ondata: formData => {
                formData.append('title', title)
                formData.append('description', description)
                formData.append('owner', userName)
                return formData
              }
            }
          }}
          onupdatefiles={handleFileChange}
          onprocessfile={handleProcessFile}
        />
        {filesSelected && title && description && (
          <Button
            onClick={handleUpload}
            className=' bg-green-500 mt-4 w-[90%] mb-5 self-center'
          >
            Envoyer ta photo sur le serveur
          </Button>
        )}
      </div>
    </div>
  )
}

export default PhotoUpload
