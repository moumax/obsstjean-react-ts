import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

function Calculator() {
  return (
    <Dialog>
      <DialogTrigger className="bg-white">Calculateur de focale</DialogTrigger>
      <DialogContent className="z-50">
        <DialogHeader>
          <DialogTitle>Calculateur de focale</DialogTitle>
          <DialogDescription>
          Sélectionne une monture puis une caméra pour savoir si la configuration est adéquate.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

export default Calculator;