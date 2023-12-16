import Leaflet from "leaflet"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"
import "./css/leaflet.css"
import iconUrl from "../assets/contact/marker.webp"
import { GoMail } from "react-icons/go"
import { SiMaildotru } from "react-icons/si"
import { AiOutlineFacebook } from "react-icons/ai"

function Contact() {
  const position = [47.891346, 1.917617];

  const newIcon = new Leaflet.Icon({
    iconUrl,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [35, 45],
  })

  return (
    <section id="contact" className="w-[90%] flex flex-col items-center h-screen">
      <h1 className="text-white text-2xl mb-4">Nous contacter</h1>
      <MapContainer
        className="h-56 w-4/5 overflow-hidden rounded-xl mb-8"
        center={position}
        zoom={17}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org/copyright">OpenstreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org./{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={newIcon}>
          <Popup>Observatoire de Saint Jean Le Blanc</Popup>
        </Marker>
      </MapContainer>
      <div className="flex flex-col items-center text-white mb-16">
        <p className="mb-8">L'Observatoire est ouvert tous les vendredis à partir de 21h00</p>
        <div className="flex flex-col items-center gap-3 justify-center w-full">
          <div className="text-yellow-400 flex gap-1">
            <GoMail />
            <p>obsstjean</p>
            <p><SiMaildotru /></p>
            <p>gmail.com</p>
          </div>
          <div className="text-yellow-400 flex items-center gap-3">
            <a href="https://www.google.fr" target="_blank" rel="noreferrer">
              <AiOutlineFacebook className="text-yellow-400 text-xl" />
            </a>
            <p>Obsstjean</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
