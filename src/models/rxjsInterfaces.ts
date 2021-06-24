import { Observable } from 'rxjs';
//--------------Step 1---------------------
interface ISchedules {
  day: string;
  open: string;
  close: string;
}
export interface ISalonDetail {
  commercialName: string;
  neighborhood: string;
  address: string;
  isValidated: boolean;
  lat: number;
  lng: number;
}
export interface IHours {
  schedule: ISchedules[];
  neighborhoods: string[];
  toggle: () => void;
  isValid: () => boolean;
  type?: string;
  activeToggle: boolean;
  appointmentTime?: string;
}

//-------------Step 2--------------------------
export interface IServices {
  hairdressingData: string[];
  estheticData: string[];
  isValid: boolean;
}

//-------------Step 3------------------------
export interface Istep3 {
  peluqueria?: {
    'Mani-Pedi'?: { name: string; price: string }[];
    Barbería?: { name: string; price: string }[];
    Corte?: { name: string; price: string }[];
    Color?: { name: string; price: string }[];
    Alisados?: { name: string; price: string }[];
    Cepillado?: { name: string; price: string }[];
    Depilación?: { name: string; price: string }[];
  };
  estetica?: {
    Reductor?: { name: string; price: string }[];
    Facial?: { name: string; price: string }[];
    Masajes?: { name: string; price: string }[];
    Láser?: { name: string; price: string }[];
  };
}

//-------------Step 4------------------------
export interface IsubServices {
  name: string;
  price: string;
  checked: boolean;
}

//-------------Step 5------------------------
export interface IExperts {
  schedule: ISchedules[];
  services: string[];
  toggle: () => void;
  isValid: () => boolean;
  activeToggle: boolean;
  ExpertName: string;
  ExpertEmail: string;
  ExpertPhone: string;
}

export interface IBussinessHoursTable {
  getState: () => IState;
  setState: (arg: IState) => void;
  obs: () => Observable<IState>;
  expertName: string;
}

export interface IProps {
  handleClick: () => void;
  handleEdit: (expertName: string) => void;
  show: boolean;
}

export interface IRender {
  name: string;
  phone: string;
  email: string;
  services: string[];
  dailyHours: ISchedules[];
  expertKey: string;
  handleEdit: (expertName: string) => void;
}

export interface IState {
  [key: string]: IExperts;
}

//-------------Global config state------------------------
export interface globalState {
  type: string;
  stepSalonDetail?: ISalonDetail;
  stepBusinessHours?: IHours;
  stepServices?: IServices;
  stepPrices?: any[];
  stepExperts?: IState;
}
