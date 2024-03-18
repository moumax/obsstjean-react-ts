import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.tsx";
import Events from "@/components/Events.tsx";
import Sun from "@/components/Sun.tsx";
import DisplaySelectorGallery from "./ui/gallery/DisplaySelectorGallery";

function Selector() {
  return (
    <Tabs defaultValue="events" className="h-full">
      <TabsList>
        <TabsTrigger value="events">Evènements</TabsTrigger>
        <TabsTrigger value="photos">Photos</TabsTrigger>
        <TabsTrigger value="sun">Météo solaire</TabsTrigger>
      </TabsList>
      <TabsContent value="events">
        <Events />
      </TabsContent>
      <TabsContent value="photos">
        <DisplaySelectorGallery />
      </TabsContent>
      <TabsContent value="sun">
        <Sun />
      </TabsContent>
    </Tabs>
  );
}

export default Selector;
