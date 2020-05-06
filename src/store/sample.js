export default {
  id: '123451',
  title: 'Bangkok & la province de Krabi',
  isPublic: false,
  users: ['thomasgosse', 'julieleleu'],
  startDate: '2020-04-27',
  endDate: '2020-05-12',
  steps: [
    {
      id: 1,
      title: 'Bangkok',
      date: '2020-04-27',
      points: [
        {
          title: 'BKK stay-inn',
          type: 'habitation',
          date: '2020-04-27',
          address: '3 Rue Watteau, Lille',
          url: 'www.booking.com/hotel/fr/villa-harmonie-paris.fr.html',
          contacts: ['+33658664500'],
          long: 12,
          lat: -13
        },
        {
          type: 'transport',
          transportType: 'plane',
          company: 'Quatar Airways',
          from: 'Paris CDG',
          to: 'Bangkok BKK'
        },
        {
          type: 'transport',
          transportType: 'bus',
          company: 'Cruz del Sur',
          from: 'Bangkok',
          to: 'Krabi'
        }
      ],
      photos: []
    },
    {
      id: 2,
      title: 'Kabri',
      date: '2020-05-04',
      points: [
        {
          title: 'Krabi House',
          date: '2020-05-04',
          type: 'habitation',
          address: '8 Rue Watteau, Lille',
          url: 'www.booking.com/hotel/fr/villa-harmonie-paris.fr.html',
          contacts: ['+33658664500', '+33786950043'],
          long: 12,
          lat: -13
        },
        {
          title: 'Aonang motel',
          date: '2020-05-07',
          type: 'habitation',
          address: '8 Rue de Valmy, Lille',
          url: 'www.booking.com/hotel/fr/villa-harmonie-paris.fr.html',
          contacts: [],
          long: 12,
          lat: -13
        },
        {
          type: 'transport',
          transportType: 'bus',
          company: 'Cruz del Norte',
          from: 'Krabi',
          to: 'Bangkok'
        },
        {
          type: 'transport',
          transportType: 'plane',
          company: 'Quatar Airways',
          from: 'Bangkok BKK',
          to: 'Paris CDG'
        }
      ],
      photos: []
    }
  ]
};

// idées (v1.5):
// - prix des habitations, des transports, des POI's, et prix divers associés a une étape (repas...)
// - durée des transports
// - avis sur les transports, habitations et POI's
// - visa ?

// idées (v2):
// - docs?

// but du créateur: avoir une récap en fin de voyage de son itinéraire, logements et activités, de ses photos, et du coût
// but du lecteur: l'aider à préparer son voyage en voyant comment aller de A à B, avec quel moyen de transport, pour quel prix, voir des photos des lieux, avoir des idées de logement
