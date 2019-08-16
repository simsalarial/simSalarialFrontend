import { Simulation } from './simulation';

export class Extras {

  'id'?: number;
  'name': string;
  'taxed': boolean;
  constructor(data?: any) {
    Object.assign(this, data);
}
}
