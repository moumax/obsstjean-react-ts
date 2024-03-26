import {
  Home,
  HelpCircle,
  CalendarDays,
  HeartHandshake,
  Lock,
  LogOut,
  ShieldQuestion
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

function Navbar() {
  const { isLoggedIn, userName } = useAuth()
  const navigate = useNavigate()

  function refreshPage() {
    window.location.reload()
  }

  const handleDisconnection = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/logout/`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        }
      )
      if (!response.ok) {
        toast.error('Déconnexion impossible...')
        throw new Error('Erreur dans la fonction logout')
      }
      refreshPage()
      toast.success('Tu es déconnecté !')
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
      toast.error('Erreur lors de la déconnexion')
    }
  }

  return (
    <nav className='fixed right-0 z-50 mr-2'>
      <ul className='mt-1 flex flex-col gap-1 rounded bg-[#072449] p-1 items-center'>
        <div className='flex gap-1'>
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
          {!isLoggedIn && (
            <li>
              <a type='submit' onClick={() => navigate('/login')}>
                <Lock strokeWidth={1} color='orange' />
              </a>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <a type='submit' onClick={() => navigate('/administration')}>
                <ShieldQuestion strokeWidth={1} color='red' />
              </a>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <a type='submit' onClick={handleDisconnection}>
                <LogOut strokeWidth={1} color='orange' />
              </a>
            </li>
          )}
        </div>
        <div>
          {isLoggedIn && (
            <p className='text-center text-xs text-primaryYellow p-1'>
              <b>{userName}</b>, tu es connecté !
            </p>
          )}
        </div>
      </ul>
    </nav>
  )
}

export default Navbar
