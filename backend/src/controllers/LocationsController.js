import LocationsManager from '../models/LocationsManager.js'

const LocationsController = {
  async getAllLocations(req, res) {
    try {
      const locations = await LocationsManager.getAll()
      res.status(200).json(locations)
    } catch (error) {
      console.error('Erreur lors de la récupération des lieux', error)
      res.status(500).send('Erreur server lors de la récupération des lieux')
    }
  },

  async createLocation(req, res) {
    const newLocation = {
      location: req.body.location
    }

    try {
      const createdLocation = await LocationsManager.create({
        ...newLocation
      })

      res.status(201).json(createdLocation)
    } catch (error) {
      console.error('Erreur lors de la création du nouveau lieu', error)
      res.status(500).send('Erreur serveur lors de la création du nouveau lieu')
    }
  },

  async editLocation(req, res) {
    const locationToUpdate = {
      location: req.body.location
    }

    try {
      const updatedLocation = await LocationsManager.update(
        locationToUpdate,
        req.params.id
      )
      res.status(200).json(updatedLocation)
    } catch (error) {
      console.error('Erreur lors de la modification du lieu', error)
      res.status(500).send('Erreur server lors de la modification du lieu')
    }
  },

  async deleteLocation(req, res) {
    try {
      const location = await LocationsManager.delete(req.params.id)
      res.status(204).json(location)
    } catch (error) {
      console.error('Erreur lors de la suppression du lieu', error)
      res.status(500).send("Le lieu n'a pas été supprimé")
    }
  }
}

export default LocationsController
