import callAPI from "@/api/callAPI";
import { useState } from "react";
import useSWR from "swr";
import DeletePhoto from "./modals/DeletePhoto";

function AdminPhotosDisplay({ username }) {
  const [images, setImages] = useState([])
  const {
    data: responseData,
    error: fetchError,
    isLoading: isLoadingData,
  } = useSWR(`${import.meta.env.VITE_BACKEND_URL}/api/gallery/${username}`, callAPI);

  if (fetchError) {
    console.error("Erreur lors de la récupération des données :", fetchError);
    return <div>Erreur lors de la récupération des données</div>;
  }

  if (isLoadingData) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h2 className="text-xl text-center mb-7">Gestion de tes photos</h2>
      {responseData.map((image) => (
        <div className="flex flex-col items-center mb-4 text-xs overflow-hidden">
          <DeletePhoto id={image.id} name={image.title} username={username} />
          <img className="w-40" src={`${import.meta.env.VITE_BACKEND_URL}/${username}/${image.imageName}`} alt={image.title} />
          <p className="text-yellow-300">{image.title}</p>
          <p style={{ wordWrap: 'break-word' }}>{image.description}</p>
        </div>
      ))}
    </div>
  );
}


export default AdminPhotosDisplay;