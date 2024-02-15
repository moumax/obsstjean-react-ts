import About from "@/components/About.tsx";
import Contact from "@/components/Contact.tsx";
import Selector from "@/components/Selector.tsx";
import Footer from "@/components/Footer.tsx";
import Header from "@/components/Header.tsx";
import Navbar from "@/components/Navbar.tsx";
import Observatory from "@/components/Observatory.tsx";
import Calculator from "@/components/Calculator";
import Finder from "@/components/Finder";

function Home() {
  return (
    <section id="home" className="flex flex-col">
      <div className="self-end">
        <Navbar />
      </div>
      <Header />
      <Observatory />
      <About />
      <Selector />
      <Calculator />
      <Finder appId="23fe54c1-8de7-498c-bb67-676a7d3b742a" appSecret="bf9f332b365c1469223a346f12bc52281d849b47712470ae1078b9f777d736789a09a860d7a7ccd42e591c8ec85076d01738b4d77fade58c03a0c984391a0f5de5247eb9facfdccdbcc8778e0f10bd0009a4101086c4a34bed85cf47f2c65f45451b82aefcad19d8b20e4750f41b11a3"/>
      <Contact />
      <Footer />
    </section>
  );
}

export default Home;
