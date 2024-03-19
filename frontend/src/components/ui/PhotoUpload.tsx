import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';
import "./filepond.css"
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { useRef, useState } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "./button";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginImageResize, FilePondPluginImageTransform);

function PhotoUpload() {
  const [image, setImage] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const filePondRef = useRef(null);
  const [filesSelected, setFilesSelected] = useState(false); // Nouvel état pour suivre si des fichiers sont sélectionnés
  const baseURL = "http://localhost:5000/api/upload/";
  const { userName } = useAuth();

  const handleUpload = () => {
    if (filePondRef.current) {
      filePondRef.current.processFiles();
    }
  };

  const handleFileChange = (files) => {
    setImage(files);
    setFilesSelected(files.length > 0); // Met à jour l'état selon si des fichiers sont sélectionnés ou non
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl text-center mb-7">Poste tes photos !</h2>
      <div>
        <Label>
          Titre de la photo
        </Label>
        <Input
          type="text"
          className="text-black"
          value={title}
          onChange={e => {
            setTitle(e.target.value);
          }}
          placeholder="Titre de ton image"
        />
        <Label>
          Description de la photo
        </Label>
        <Input
          type="text"
          className="text-black"
          value={description}
          onChange={e => {
            setDescription(e.target.value);
          }}
          placeholder="Description de ton image"
        />
      </div>
      <FilePond
        labelIdle={`
          <div style="width:100%;height:100%;">
            <p>
              Fait glisser ton image ou <span class="filepond--label-action" tabindex="0">cherche sur ton disque dur</span><br>
            </p>
          </div>
        `}
        allowMultiple={true}
        files={image}
        credits={false}
        maxFiles={5}
        instantUpload={false}
        allowImageTransform={true}
        allowImageResize={true}
        name="image"
        allowReorder={true}
        imageTransformVariantsIncludeOriginal={true}
        imageResizeTargetWidth={256}
        imageTransformVariants={{
          thumb_medium_: (file) => {
            return {
              width: 256
            };
          }
        }}
        server={{
          process: {
            url: baseURL,
            method: 'POST',
            withCredentials: true,
            ondata: (formData) => {
              formData.append("title", title);
              formData.append("description", description)
              formData.append("owner", userName)
              return formData;
            }
          },
        }}
        onupdatefiles={handleFileChange}
      />
      {filesSelected && ( // Affiche le bouton uniquement si des fichiers sont sélectionnés
        <Button onClick={handleUpload} className="btn bg-green-500 mt-4 w-full mb-5">
          Upload
        </Button>
      )}
    </div>
  );
}

export default PhotoUpload;
