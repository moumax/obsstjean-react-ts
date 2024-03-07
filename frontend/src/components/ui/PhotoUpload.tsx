import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "./filepond.css"
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { useState } from "react";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

function PhotoUpload() {
  const [image, setImage] = useState([]);
  const baseURL = "http://localhost:5000/api/upload/"

  return (
    <div className="mt-4">
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
            withCredentials: true
          },
        }}

      />
    </div>
  );
}

export default PhotoUpload;
