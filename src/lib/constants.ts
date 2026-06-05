export const EVENT_NAME = 'Pregón Cultural por las Fiestas Patronales Virgen del Carmen 2026';

export const EVENT_DATE = '04 de julio de 2026';
export const EVENT_TIME = '13h00';
export const EVENT_START_LOCATION = 'Iglesia Central Nuestra Señora del Carmen';
export const EVENT_END_LOCATION = 'Frente al GAD Municipal de Puerto Quito';
export const EVENT_LOCATION = 'Puerto Quito';
export const ORGANIZER = 'Colonia Cotopaxense';
export const CONTACT_PHONE = '+593 993531626';
export const CONTACT_WHATSAPP = '593993531626';

export const CATEGORIES = {
  danza_ninos: {
    label: 'Danza Niños (3 a 12 años)',
    prizes: [
      { place: 'Primer lugar', amount: 'USD 150' },
      { place: 'Segundo lugar', amount: 'USD 75' },
      { place: 'Tercer lugar', amount: 'USD 50' },
    ],
  },
  danza_general: {
    label: 'Danza General (13 años en adelante)',
    prizes: [
      { place: 'Primer lugar', amount: 'USD 150' },
      { place: 'Segundo lugar', amount: 'USD 75' },
      { place: 'Tercer lugar', amount: 'USD 50' },
    ],
  },
} as const;

export const FLOAT_PRIZES = [
  { place: 'Premio único', amount: 'USD 100' },
];

export const DANCE_CRITERIA = [
  'Estética y coordinación de los integrantes',
  'Cantidad de integrantes (mínimo 12, máximo 20)',
  'Vestimenta de los participantes',
  'Tiempo de presentación mínimo 3 minutos y máximo 5 minutos',
];

export const FLOAT_CRITERIA = [
  'Creatividad',
  'Originalidad',
  'Relación con el tema',
  'Materiales utilizados',
];

export const REGISTRATION_PREFIX = 'PG-2026';

export const MIN_PARTICIPANTS = 12;
export const MAX_PARTICIPANTS = 20;
