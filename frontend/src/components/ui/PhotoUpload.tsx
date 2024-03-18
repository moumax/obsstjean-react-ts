import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "./filepond.css"
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { useState } from "react";
import { Label } from "./label";
import { Input } from "./input";
import { useAuth } from "@/contexts/AuthContext";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function PhotoUpload() {
  const [image, setImage] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const baseURL = "http://localhost:5000/api/upload/";
  const { userName } = useAuth();

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
        name="image"
        allowReorder={true}
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
      />
    </div>
  );
}

export default PhotoUpload;
