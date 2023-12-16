import About from "@/components/About.tsx"
import Contact from "@/components/Contact.tsx"
import Events from "@/components/Events.tsx"
import Footer from "@/components/Footer.tsx"
import Header from "@/components/Header.tsx"
import Navbar from "@/components/Navbar.tsx"
import Observatory from "@/components/Observatory.tsx"

function Home() {
  return (
    <section id="home" className="flex flex-col">
      <div className="self-end">
        <Navbar />
      </div>
      <Header />
      <Observatory />
      <About />
      <Events />
      <Contact />
      <Footer />
    </section>
  )
}

export default Home
