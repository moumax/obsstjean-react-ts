import observations from '@/assets/about/photoObservation001.jpg'
import coupole from '@/assets/about/photoCoupole001.jpg'
import conferences from '@/assets/about/photoConference001.jpg'
import events from '@/assets/about/photoEvenement001.jpg'

const datasAbout = [
  {
    id: 1,
    title: 'OBSERVATIONS',
    image: observations,
    alt: 'Notre jardin',
    textFr:
      "Notre matériel nous permet de nombreuses observations ainsi que la pratique de l'astrophotographie."
  },
  {
    id: 2,
    title: 'LA COUPOLE',
    image: coupole,
    alt: 'Notre coupole',
    textFr:
      "L'Observatoire est doté d'une coupole pour l'astrophotographie du ciel profond."
  },
  {
    id: 3,
    title: 'CONFERENCES',
    image: conferences,
    alt: 'Nuit des étoiles',
    textFr: "Des conférences, toute l'année, sur des sujets... astronomiques!"
  },
  {
    id: 4,
    title: 'EVENEMENTS',
    image: events,
    alt: 'Exposition photo',
    textFr:
      "Toute l'année, nous participons à de nombreux événements : Fête de la Science, Nuit des Etoiles, visites d'observatoires"
  }
]

export default datasAbout
