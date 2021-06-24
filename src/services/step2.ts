import { BehaviorSubject, Observable } from 'rxjs';
import { IServices } from '../models/rxjsInterfaces';
/**
 * Variable que nos permite almacenar cualquier tipo de valor en un Subject de RxJs
 */

const initialState = {
  hairdressingData: [],
  estheticData: [],
  isValid: false,
};

const $state = new BehaviorSubject<IServices>(initialState);

export function setStateServices(state: IServices): void {
  $state.next(state);
}

export function getStateServices(): IServices {
  return $state.value;
}

export function stateObservable(): Observable<{
  [key: string]: any;
}> {
  return $state.asObservable();
}
