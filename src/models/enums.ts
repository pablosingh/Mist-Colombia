export enum PartnerType {
  SALON = 'Salón',
  INDEPENDENT = 'Independiente',
}

export const PartnerTypeArray = Object.values(PartnerType);

export enum neighborhood {
  CHICO = 'Chico',
  SANTA_BARBARA = 'Santa Barbara',
  SAN_PATRICIO = 'San Patricio',
  SANTA_BIBIANA = 'Santa Bibiana',
  ROSALES = 'Rosales',
}

export enum days {
  LUNES = 'Lunes',
  MARTES = 'Martes',
  MIÉRCOLES = 'Miércoles',
  JUEVES = 'Jueves',
  VIERNES = 'Viernes',
  SÁBADO = 'Sábado',
  DOMINGO = 'Domingo',
  FESTIVOS = 'Festivos',
}

export const keys = Object.keys(days);

export enum weekDays {
  Lunes,
  Martes,
  Miércoles,
  Jueves,
  Viernes,
  Sábado,
  Domingo,
  Festivos,
}

export const daysKeys = Object.keys(weekDays);

export enum hairdressingServices {
  MANI_PEDI = 'Mani-Pedi',
  BARBERIA = 'Barbería',
  CORTE = 'Corte',
  COLOR = 'Color',
}

export enum estheticServices {
  REDUCTOR = 'Reductor',
  FACIAL = 'Facial',
  MASAJES = 'Masajes',
  LASER = 'Laser',
}

export enum HairdressingTypes {
  MANI_PEDI = 'Mani-Pedi',
  BARBERIA = 'Barbería',
  CORTE = 'Corte',
  COLOR = 'Color',
  ALISADOS = 'Alisados',
  CEPILLADO = 'Cepillado',
  DEPILACION = 'Depilación',
}

export enum CosmeticsTypes {
  REDUCTOR = 'Reductor',
  FACIAL = 'Facial',
  MASAJES = 'Masajes',
  LASER = 'Láser',
}

export enum ManiPediTypes {
  MANI_TRADICIONAL = 'Mani - Tradicional',
  PEDI_TRADICIONAL = 'Pedi - Tradicional',
  MANI_SEMIPERMANENTE = 'Mani - Semi permanente',
  PEDI_SEMIPERMANENTE = 'Pedi - Semi permanente',
  MANI_ACRILICO = 'Mani - Acrilico',
  PEDI_ACRILICO = 'Pedi - Acrilico',
  MANI_GEL = 'Mani - Gel',
  PEDI_GEL = 'Pedi - Gel',
  MANI_CAMBIO_DE_ESMALTE = 'Mani - Cambio de esmalte',
  PEDI_CAMBIO_DE_ESMALTE = 'Pedi - Cambio de esmalte',
}

export enum WaxingTypes {
  BIKINI_CERA = 'Bikini - Cera',
  PIERNA_CERA = 'Pierna - Cera',
  MEDIA_PIERNA_CERA = 'Media Pierna - Cera',
  AXILAS_CERA = 'Axilas - Cera',
  BIGOTE_CERA = 'Bigote - Cera',
}

export enum BarberTypes {
  SERVICIO1 = 'BarberTypes - uno',
  SERVICIO2 = 'BarberTypes - dos',
  SERVICIO3 = 'BarberTypes - tres',
  SERVICIO4 = 'BarberTypes - cuatro',
  SERVICIO5 = 'BarberTypes - cinco',
}

export enum CutTypes {
  SERVICIO1 = 'CutTypes - uno',
  SERVICIO2 = 'CutTypes - dos',
  SERVICIO3 = 'CutTypes - tres',
  SERVICIO4 = 'CutTypes - cuatro',
  SERVICIO5 = 'CutTypes - cinco',
  SERVICIO6 = 'CutTypes - seis',
  SERVICIO7 = 'CutTypes - siete',
  SERVICIO8 = 'CutTypes - ocho',
}

export enum ColorTypes {
  SERVICIO1 = 'ColorTypes - uno',
  SERVICIO2 = 'ColorTypes - dos',
  SERVICIO3 = 'ColorTypes - tres',
  SERVICIO4 = 'ColorTypes - cuatro',
  SERVICIO5 = 'ColorTypes - cinco',
  SERVICIO6 = 'ColorTypes - seis',
  SERVICIO7 = 'ColorTypes - siete',
}

export enum HairStraighteningTypes {
  SERVICIO1 = 'HairStraighteningTypes - uno',
  SERVICIO2 = 'HairStraighteningTypes - dos',
  SERVICIO3 = 'HairStraighteningTypes - tres',
  SERVICIO4 = 'HairStraighteningTypes - cuatro',
  SERVICIO5 = 'HairStraighteningTypes - cinco',
}

export enum HairCombingTypes {
  SERVICIO1 = 'HairCombingTypes - uno',
  SERVICIO2 = 'HairCombingTypes - dos',
  SERVICIO3 = 'HairCombingTypes - tres',
  SERVICIO4 = 'HairCombingTypes - cuatro',
  SERVICIO5 = 'HairCombingTypes - cinco',
  SERVICIO6 = 'HairCombingTypes - seis',
}

export enum ReducerTypes {
  SERVICIO1 = 'ReducerTypes - uno',
  SERVICIO2 = 'ReducerTypes - dos',
  SERVICIO3 = 'ReducerTypes - tres',
  SERVICIO4 = 'ReducerTypes - cuatro',
  SERVICIO5 = 'ReducerTypes - cinco',
  SERVICIO6 = 'ReducerTypes - seis',
  SERVICIO7 = 'ReducerTypes - siete',
}

export enum FacialTypes {
  SERVICIO1 = 'FacialTypes - uno',
  SERVICIO2 = 'FacialTypes - dos',
  SERVICIO3 = 'FacialTypes - tres',
  SERVICIO4 = 'FacialTypes - cuatro',
  SERVICIO5 = 'FacialTypes - cinco',
  SERVICIO6 = 'FacialTypes - seis',
  SERVICIO7 = 'FacialTypes - siete',
  SERVICIO8 = 'FacialTypes - ocho',
  SERVICIO9 = 'FacialTypes - nueve',
  SERVICIO10 = 'FacialTypes - diez',
}

export enum MassageTypes {
  SERVICIO1 = 'MassageTypes - uno',
  SERVICIO2 = 'MassageTypes - dos',
  SERVICIO3 = 'MassageTypes - tres',
  SERVICIO4 = 'MassageTypes - cuatro',
  SERVICIO5 = 'MassageTypes - cinco',
  SERVICIO6 = 'MassageTypes - seis',
  SERVICIO7 = 'MassageTypes - siete',
  SERVICIO8 = 'MassageTypes - ocho',
  SERVICIO9 = 'MassageTypes - nueve',
  SERVICIO10 = 'MassageTypes - diez',
}

export enum LaserTypes {
  SERVICIO1 = 'LaserTypes - uno',
  SERVICIO2 = 'LaserTypes - dos',
  SERVICIO3 = 'LaserTypes - tres',
  SERVICIO4 = 'LaserTypes - cuatro',
}

export const hairdressingServiceArray = Object.values(HairdressingTypes);
export const maniPediSubServiceArray = Object.values(ManiPediTypes);
export const waxingSubServiceArray = Object.values(WaxingTypes);
export const barberSubServiceArray = Object.values(BarberTypes);
export const cutSubServiceArray = Object.values(CutTypes);
export const colorSubServiceArray = Object.values(ColorTypes);
export const hairStraighteningSubServiceArray = Object.values(
  HairStraighteningTypes
);
export const hairCombingSubServiceArray = Object.values(HairCombingTypes);
export const cosmeticsServiceArray = Object.values(CosmeticsTypes);
export const reducerSubServiceArray = Object.values(ReducerTypes);
export const facialSubServiceArray = Object.values(FacialTypes);
export const massageSubServiceArray = Object.values(MassageTypes);
export const laserSubServiceArray = Object.values(LaserTypes);
