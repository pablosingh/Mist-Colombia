import { BehaviorSubject, Observable } from 'rxjs';
import { IsubServices } from '../models/rxjsInterfaces';

const $state = new BehaviorSubject<IsubServices[]>([]);

export function setState(state: IsubServices[]): void {
  $state.next(state);
}

export function getState(): IsubServices[] {
  return $state.value;
}

export function stateObservable(): Observable<IsubServices[]> {
  return $state.asObservable();
}
