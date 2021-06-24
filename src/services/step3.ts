import { BehaviorSubject, Observable } from 'rxjs';
import { Istep3 } from '../models/rxjsInterfaces';

/**
 * Variable que nos permite almacenar cualquier tipo de valor en un Subject de RxJs
 */

const $state = new BehaviorSubject<Istep3>({});

export function setState(state: Istep3): void {
  $state.next(state);
}

export function getState(): Istep3 {
  return $state.value;
}

export function stateObservable(): Observable<Istep3> {
  return $state.asObservable();
}

// ===========================================================

// export interface IIstep3 {
//   subServices?: { name: string; price: string }[];
// }

// const $state = new BehaviorSubject<IIstep3>({});

// export function setState(state: IIstep3): void {
//   $state.next(state);
// }

// export function getState(): IIstep3 {
//   return $state.value;
// }

// export function stateObservable(): Observable<IIstep3> {
//   return $state.asObservable();
// }
