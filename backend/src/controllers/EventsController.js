import EventsManager from "../models/EventsManager.js";

const EventsController = {
  async getAllEvents(req, res) {
    try {
      const events = await EventsManager.getAll();
      res.status(200).json(events);
    } catch (error) {
      console.error("Erreur lors de la récupération des événements", error);
      res
        .status(500)
        .send("Erreur server lors de la récupération des événements");
    }
  },

  async createEvent(req, res) {
    const newEvent = {
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      date: req.body.date,
      hours: req.body.hours,
      minutes: req.body.minutes,
    };

    try {
      const createdEvent = await EventsManager.create(newEvent);
      res.status(201).json(createdEvent);
    } catch (error) {
      console.error("Erreur lors de la création de l'événement", error);
      res.status(500).send("Erreur server lors de la création de l'événement");
    }
  },

  async editEvent(req, res) {
    const eventToUpdate = {
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      date: req.body.date,
      hours: req.body.hours,
      minutes: req.body.minutes,
    };

    try {
      const updatedEvent = await EventsManager.update(
        eventToUpdate,
        req.params.id,
      );
      res.status(200).json(updatedEvent);
    } catch (error) {
      console.error("Erreur lors de la modification de l'événement", error);
      res
        .status(500)
        .send("Erreur server lors de la modification de l'événement");
    }
  },

  async deleteEvent(req, res) {
    try {
      const events = await EventsManager.delete(req.params.id);
      res.status(204).json(events);
    } catch (error) {
      console.error("Erreur lors de la suppression de l'évènement", error);
      res.status(500).send("L'évènement n'a pas été supprimé");
    }
  },
};

export default EventsController;
