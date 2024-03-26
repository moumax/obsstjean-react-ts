import DisplaySelectorGallery from './DisplaySelectorGallery'
import Sampling from '../sampler/Sampling'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/shad/tabs'
import Events from '@/components/selector/Events'
import Sun from '@/components/selector/Sun'

function Selector() {
  return (
    <div id='selector' className='scroll-mt-20'>
      <Tabs
        defaultValue='events'
        className='h-full text-center w-full overflow-hidden mb-12 scroll-mt-20'
      >
        <TabsList className='flex justify-between w-full bg-transparent text-primaryYellow border border-gray-300'>
          <TabsTrigger
            value='events'
            className='data-[state=active]:bg-gray-400 data-[state=active]:opacity-50 data-[state=active]:text-green-200'
          >
            Calendrier
          </TabsTrigger>
          <TabsTrigger
            value='photos'
            className='data-[state=active]:bg-gray-400 data-[state=active]:opacity-50 data-[state=active]:text-green-200'
          >
            Photos
          </TabsTrigger>
          <TabsTrigger
            value='sun'
            className='data-[state=active]:bg-gray-400 data-[state=active]:opacity-50 data-[state=active]:text-green-200'
          >
            Solaire
          </TabsTrigger>
          <TabsTrigger
            value='tools'
            className='data-[state=active]:bg-gray-400 data-[state=active]:opacity-50 data-[state=active]:text-green-200'
          >
            Outils
          </TabsTrigger>
        </TabsList>
        <TabsContent value='events'>
          <Events />
        </TabsContent>
        <TabsContent value='photos'>
          <DisplaySelectorGallery />
        </TabsContent>
        <TabsContent value='sun'>
          <Sun />
        </TabsContent>
        <TabsContent value='tools'>
          <Sampling />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Selector
