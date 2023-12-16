import { Home, HelpCircle, CalendarDays, HeartHandshake } from "lucide-react"

function Navbar() {
  return (
    <nav className="right-0 mr-2 fixed z-50">
      <ul className="bg-white/20 rounded mt-1 p-1 flex flex-row gap-1">
        <li>
          <a href="#home"><Home strokeWidth={1} color="orange" /></a>
        </li>
        <li>
          <a href="#about"><HelpCircle strokeWidth={1} color="orange" /></a>
        </li>
        <li>
          <a href="#calendar"><CalendarDays strokeWidth={1} color="orange" /></a>
        </li>
        <li>
          <a href="#contact"><HeartHandshake strokeWidth={1} color="orange" /></a>
        </li>
      </ul>
      <p className="text-xs text-center text-white">Bienvenue <b>Marco</b></p>
    </nav>
  )
}

export default Navbar
