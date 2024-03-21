export type CameraData = {
  id: number
  brand: string
  model: string
  sensor: string
  sensor_type: string
  sensor_width_mm: number
  sensor_height_mm: number
  sensor_width_pixel: number
  sensor_height_pixel: number
  photosites: number
  megapixels: number
  fps: number
  dynamic: number
  bits: number
  pixel_capacity: number
  cooler: number
}

export type RefractorData = {
  id: number
  brand: string
  model: string
  diameter: number
  focal: number
  focal_ratio: number
}

export type WavelengthData = {
  id: number
  color: string
  value: number
}

export type SkyObjectData = {
  id: number
  object: string
  size: number
  angle: number
}

export type MemberData = {
  id: number
  member: string
  email: string
  subscriptionDate: string
  memberType: string
}

export type EventData = {
  id: number
  title: string
  description: string
  date: Date
  location: string
  hours: number
  minutes: number
}

export type UserData = {
  id: number
  email: string
  name: string
  role: string
  password_hash: string
  photograph: boolean
}

export type LocationData = {
  id: number
  location: string
}
