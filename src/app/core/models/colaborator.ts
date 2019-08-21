import { Simulation } from './simulation';
import { Account } from '.';

export class Colaborator {

    'id'?: number;
    'name': string;
	  'status': string;
    'dependents': number;
    'simulations': Array<Simulation>;
    // tslint:disable-next-line: new-parens
    'account'?: Account;

    constructor(data?: any) {
        Object.assign(this, data);
    }
}
