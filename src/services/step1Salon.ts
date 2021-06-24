import { BehaviorSubject, Observable } from 'rxjs';
import { ISalonDetail } from '../models/rxjsInterfaces';
/**
 * Variable que nos permite almacenar cualquier tipo de valor en un Subject de RxJs
 */

const initialState = {
  commercialName: '',
  neighborhood: '',
  address: '',
  isValidated: false,
  lat: 0,
  lng: 0,
};

const $state = new BehaviorSubject<ISalonDetail>(initialState);

export function setStateSD(state: ISalonDetail): void {
  $state.next(state);
}

export function getStateSD(): ISalonDetail {
  return $state.value;
}

export function stateObservableSD(): Observable<ISalonDetail> {
  return $state.asObservable();
}
