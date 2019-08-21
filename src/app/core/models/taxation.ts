import { Simulation } from './simulation';

export class Taxation {

  'id'?: number;
  'workerSocialSecurity': number;
  'companySocialSecurity': number;
  'autonomousTributation': number;

  constructor(data?: any) {
    Object.assign(this, data);
}
}
