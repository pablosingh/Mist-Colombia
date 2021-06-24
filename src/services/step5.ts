import { BehaviorSubject, Observable } from 'rxjs';
import { IState } from '../models/rxjsInterfaces';
/**
 * Variable que nos permite almacenar cualquier tipo de valor en un Subject de RxJs
 */

const $state = new BehaviorSubject<IState>({});

export function setStateExpert(state: IState): void {
  $state.next(state);
}

export function getStateExpert(): IState {
  return $state.value;
}

export function stateObservableExpert(): Observable<IState> {
  return $state.asObservable();
}
