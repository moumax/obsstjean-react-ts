import { RefractorData, CameraData } from "@/types/types";

export const sampleCalculation = (
  selectedRefractor: RefractorData | null,
  selectedCamera: CameraData | null,
  barlowSize: number,
) => {
  if (selectedRefractor && selectedCamera) {
    const sample =
      (selectedCamera.photosites * 206.26) / selectedRefractor.focal;

    const sampleBarlow = sample / barlowSize;
    console.log("sample", sampleBarlow.toFixed(2));
    return sampleBarlow.toFixed(2);
  } else {
    return (
      <div className="pb-10 pt-10">
        Tu dois sélectionner une caméra ainsi qu'un tube optique !
      </div>
    );
  }
};
