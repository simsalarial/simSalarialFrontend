import { Simulation } from './simulation';

export class Extras {

  'id'?: number;
  'name': string;
  'bE': boolean;
  'iRS': boolean;
  'sA': boolean;
  'sS': boolean;
  'tA': boolean;
  'varComponent': boolean;
  'value'?: number;

  constructor(data?: any) {
    Object.assign(this, data);
}
}
