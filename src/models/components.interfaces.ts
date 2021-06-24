import { Observable } from 'rxjs';

export interface Ihandler {
  handleInputChange: (name: string, value: string | undefined) => void;
  errormessage?: string;
}

export interface IselectProps extends Ihandler {
  selectValues: string[];
  inputType: string;
  placeholder: string;
  value?: string;
}

export interface IinputPasswordHandler extends Ihandler {
  name: string;
  placeholder: string;
}
export interface IinputStringHandler extends Ihandler {
  name: string;
  placeholder: string;
  value?: string;
}

export interface IButton {
  text: string;
  handleSubmit: () => void;
  isValid: boolean;
}

export interface Istring {
  [key: string]: string;
}

export interface Icity {
  departamento: string;
  municipio: string;
}

export interface ILabelText {
  text: string;
  disabled?: boolean;
}

export interface IinputPassword extends Ihandler {
  name: string;
  isValid: (valid: boolean) => void;
}

export interface IResults {
  result: boolean;
  message: string;
  dir: string;
}

export interface ISchedules {
  open: string;
  close: string;
}

export interface IHourInput {
  active: boolean | undefined;
  value: string;
  name: string;
  handleInputChange: (name: string, value: string) => void;
}

export interface ITime {
  value: string | number | undefined | readonly string[];
}

export interface ITitleProps {
  text: string;
  handleToggleChange: () => void;
  toggled: boolean;
}
