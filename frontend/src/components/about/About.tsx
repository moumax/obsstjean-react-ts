import { Carousel } from 'react-responsive-carousel'
import datasAbout from '@/datas/datasAbout.ts'
import CardAbout from '@/components/about/CardAbout'

import 'react-responsive-carousel/lib/styles/carousel.min.css'
import '@/components/css/Carousel.css'

function About() {
  return (
    <section
      id='about'
      className='flex items-center w-full h-fit mb-12 scroll-mt-20'
    >
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
