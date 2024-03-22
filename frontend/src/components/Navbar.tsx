import { Home, HelpCircle, CalendarDays, HeartHandshake } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

function Navbar() {
  const { isLoggedIn, userName } = useAuth()

  return (
    <nav className='fixed right-0 z-50 mr-2'>
      <ul className='mt-1 flex flex-row gap-1 rounded bg-white/20 p-1'>
        <li>
          <a href='#home'>
            <Home strokeWidth={1} color='orange' />
          </a>
        </li>
        <li>
          <a href='#about'>
            <HelpCircle strokeWidth={1} color='orange' />
          </a>
        </li>
        <li>
          <a href='#selector'>
            <CalendarDays strokeWidth={1} color='orange' />
          </a>
        </li>
        <li>
          <a href='#contact'>
            <HeartHandshake strokeWidth={1} color='orange' />
          </a>
        </li>
      </ul>
      <p className='text-center text-xs text-white'>
        Bienvenue <b>{isLoggedIn ? userName : 'visiteur'} !</b>
      </p>
    </nav>
  )
}

export default Navbar
