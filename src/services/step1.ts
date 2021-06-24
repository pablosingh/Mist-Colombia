import { BehaviorSubject, Observable } from 'rxjs';
import { PartnerType } from '../models/enums';
import { IHours } from '../models/rxjsInterfaces';
/**
 * Variable que nos permite almacenar cualquier tipo de valor en un Subject de RxJs
 */

const initialState: IHours = {
  schedule: [],
  neighborhoods: [],
  toggle: function () {
    if (this.schedule[0]) {
      const open = this.schedule[0].open;
      const close = this.schedule[0].close;
      this.schedule.map((sch) => {
        sch.open = open;
        sch.close = close;
      });
    }
  },
  activeToggle: false,
  appointmentTime: '',
  isValid: function () {
    if (this.type === PartnerType.SALON && this.schedule.length) return true;
    if (this.schedule.length && this.neighborhoods.length) return true;
    return false;
  },
};

const $state = new BehaviorSubject<IHours>(initialState);

export function setStateSch(state: IHours): void {
  $state.next(state);
}

export function getStateSch(): IHours {
  return $state.value;
}

export function stateObservableSch(): Observable<IHours> {
  return $state.asObservable();
}
