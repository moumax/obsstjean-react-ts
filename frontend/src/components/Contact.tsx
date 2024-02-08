import Leaflet, { LatLngTuple } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "./css/leaflet.css";
import iconUrl from "../assets/contact/marker.webp";
import { GoMail } from "react-icons/go";
import { SiMaildotru } from "react-icons/si";
import { AiOutlineFacebook } from "react-icons/ai";

function Contact() {
  const position: LatLngTuple = [47.891346, 1.917617];

  const newIcon = new Leaflet.Icon({
    iconUrl,
    iconAnchor: [5, 55],
    popupAnchor: [10, -44],
    iconSize: [35, 45],
  });

  return (
    <section
      id="contact"
      className="flex h-screen w-[90%] flex-col items-center"
    >
      <h1 className="mb-4 text-2xl text-white">Nous contacter</h1>
      <MapContainer
        className="mb-8 h-56 w-4/5 overflow-hidden rounded-xl"
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
      <div className="mb-16 flex flex-col items-center text-white">
        <p className="mb-8">
          L'Observatoire est ouvert tous les vendredis à partir de 21h00
        </p>
        <div className="flex w-full flex-col items-center justify-center gap-3">
          <div className="flex gap-1 text-yellow-400">
            <GoMail />
            <p>obsstjean</p>
            <p>
              <SiMaildotru />
            </p>
            <p>gmail.com</p>
          </div>
          <div className="flex items-center gap-3 text-yellow-400">
            <a href="https://www.google.fr" target="_blank" rel="noreferrer">
              <AiOutlineFacebook className="text-xl text-yellow-400" />
            </a>
            <p>Obsstjean</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
