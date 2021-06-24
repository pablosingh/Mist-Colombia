import { BehaviorSubject, Observable } from 'rxjs';
import { PartnerType } from '../models/enums';
import { globalState } from '../models/rxjsInterfaces';

/**
 * Variable que nos permite almacenar cualquier tipo de valor en un Subject de RxJs
 */
const $state = new BehaviorSubject<globalState>({
  type: PartnerType.SALON,
});

export function setGlobalState(state: globalState): void {
  $state.next(state);
}

export function getGlobalState(): globalState {
  return $state.value;
}

export function stateObservable(): Observable<globalState> {
  return $state.asObservable();
}
