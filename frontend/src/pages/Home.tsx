import About from '@/components/about/About'
import Contact from '@/components/contact/Contact'
import Selector from '@/components/selector/Selector'
import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'
import Navbar from '@/components/navbar/Navbar'
import Observatory from '@/components/observatory/Observatory'

function Home() {
  return (
    <section id='home' className='flex flex-col'>
      <div className='self-end'>
        <Navbar />
      </div>
      <Header />
      <Observatory />
      <About />
      <Selector />
      <Contact />
      <Footer />
    </section>
  )
}

export default Home
