import Leaflet, { LatLngTuple } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import './css/leaflet.css'
import iconUrl from '../assets/contact/marker.webp'
import { GoMail } from 'react-icons/go'
import { SiMaildotru } from 'react-icons/si'
import { AiOutlineFacebook } from 'react-icons/ai'

function Contact() {
  const position: LatLngTuple = [47.891346, 1.917617]

  const newIcon = new Leaflet.Icon({
    iconUrl,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [35, 45]
  })

  return (
    <section
      id='contact'
      className='z-40 flex flex-col items-center scroll-mt-20 w-full mb-10 pb-0'
    >
      <h1 className='mb-4 text-2xl text-white'>Nous contacter</h1>
      <MapContainer
        className='rounded-x-10 mb-8 pt-28 h-48 w-full overflow-hidden'
        center={position}
        zoom={17}
        scrollWheelZoom={false}
      >
        <TileLayer
          className='flex items-center justify-center w-full'
          attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenstreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org./{z}/{x}/{y}.png'
        />
        <Marker position={position} icon={newIcon}>
          <Popup>Observatoire de Saint Jean Le Blanc</Popup>
        </Marker>
      </MapContainer>
      <div className='mb-4 flex flex-col items-center text-center text-white'>
        <p className='mb-8'>
          L'Observatoire est ouvert tous les vendredis à partir de 21h00
        </p>
        <p className='mb-1 text-xs italic text-white/50'>
          Observatoire astronomique de Saint Jean le Blanc
        </p>
        <p className='mb-1 text-xs italic text-white/50'>4, rue Demay</p>
        <p className='mb-8 text-xs italic text-white/50'>
          45650 Saint Jean le Blanc
        </p>
        <div className='flex w-full flex-col items-center justify-center gap-1'>
          <div className='flex gap-1 text-primaryYellow items-center'>
            <GoMail size={30} />
            <p className='pl-2'>obsstjean</p>
            <p>
              <SiMaildotru />
            </p>
            <p>gmail.com</p>
          </div>
          <div className='flex items-center gap-2 text-primaryYellow'>
            <a href='https://www.google.fr' target='_blank' rel='noreferrer'>
              <AiOutlineFacebook
                size={30}
                className='text-xl text-primaryYellow'
              />
            </a>
            <SiMaildotru />
            <p className='-m-2'>Obsstjean</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
