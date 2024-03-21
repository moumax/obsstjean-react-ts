import { Carousel } from 'react-responsive-carousel'
import datasAbout from '@/datas/datasAbout.ts'
import CardAbout from '@/components/ui/CardAbout.tsx'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import './Carousel.css'

function About() {
  return (
    <section id='about' className='flex items-center w-full h-fit mb-12'>
      <Carousel
        infiniteLoop
        autoPlay
        interval={4000}
        showStatus={false}
        showIndicators
        showThumbs={false}
        className='w-full h-full'
      >
        {datasAbout.map(data => (
          <CardAbout key={data.id} data={data} />
        ))}
      </Carousel>
    </section>
  )
}

export default About
