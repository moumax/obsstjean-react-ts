import { BiLogoJavascript, BiLogoReact } from 'react-icons/bi'
import { SiMysql } from 'react-icons/si'

function Footer() {
  return (
    <footer className='flex flex-col'>
      <div className='flex flex-col items-center text-center text-xs text-white opacity-40'>
        <p>© 2019 - 2023 -- Marc LANTOL</p>
        <p>Observatoire Astronomique de Saint Jean Le Blanc (V3.0.0)</p>
        <div className='mb-4 mt-4 flex gap-3 self-center'>
          <BiLogoReact size='3rem' color='#61DAFB' />
          <BiLogoJavascript size='3rem' color='yellow' />
          <SiMysql size='3rem' color='#3e6e93' />
          <img
            className='w-8'
            src='src/assets/footer/logo_st_jean_le_blanc.png'
            alt='Ville de Saint Jean Le Blancé'
          />
        </div>
      </div>
    </footer>
  )
}

export default Footer
