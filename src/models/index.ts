export interface IgeneralInfoinput {
  general: {
    name: string;
    tel: string;
    email: string;
    idDoc: string;
    type?: string;
    userId?: string;
    user: string;
    idType?: 'NIT' | 'CC' | 'CE';
  };
  salon: {
    reason?: string;
    legalName?: string;
    legalIdDoc?: string;
    legalIdType?: string;
    salonId?: string;
  };
  independent: {
    idExpeditionDate?: string;
    idExpeditionCity?: string;
  };
}
export interface ISchedules {
  day: string;
  open: string;
  close: string;
}
export interface IDay {
  day: string;
  type?: string;
  step?: string;
  schedule: ISchedules | undefined;
  toggled?: boolean;
  checked?: boolean;
  expertName?: string;
}

export interface IinputChangePasswordForm {
  oldPassword: string;
  newPassword: string;
  newPasswordCheck: string;
  checkbox: boolean;
}

export interface IselectProps {
  selectValues: string[];
  inputType: string;
}

export interface ILegalVinculation {
  referenceNumber: string;
  contractDate: string;
  comissionRate: string;
  trialTime: string;
}
export interface IInputDocument {
  handleInputChange: (name: string, value: string | undefined) => void;
  selectedValue: string | undefined;
  name: string;
}

export interface Iboolean {
  [key: string]: boolean;
}

export interface IsalonConfiguration {
  commercialName: string;
  neighborhood: string;
  address?: string | undefined;
  mapRender?: boolean;
  isValidated?: boolean;
}
export interface ISearchLocation {
  selectedNeighborhood: string | undefined;
  inputEnabler: boolean;
  name: string;
  handleCoordsChange: (coords: ICoords) => void;
}
export interface IMap {
  lng: number;
  lat: number;
  address: string;
  handleCoordsChange: (coords: ICoords) => void;
  handleSearchCoordsChange: (coords: ICoords) => void;
}
export interface ICoords {
  lng: number;
  lat: number;
  address: string;
}
export interface IValidForm {
  validString: boolean;
  validButton: boolean;
  validList: boolean;
}
