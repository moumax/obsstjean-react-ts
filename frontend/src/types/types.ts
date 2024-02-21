export type CameraData = {
  id: number;
  brand: string;
  model: string;
  sensor: string;
  sensor_type: string;
  sensor_width_mm: number;
  sensor_height_mm: number;
  sensor_width_pixel: number;
  sensor_height_pixel: number;
  photosites: number;
  megapixels: number;
  fps: number;
  dynamic: number;
  bits: number;
  pixel_capaoity: number;
  cooler: number;
};

export type RefractorData = {
  id: number;
  brand: string;
  model: string;
  diameter: number;
  focal: number;
  focal_ratio: number;
  resolution: number;
};

export type WavelengthData = {
  id: number;
  color: string;
  value: number;
};
