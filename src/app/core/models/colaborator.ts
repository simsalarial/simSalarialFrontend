import { Simulation } from './simulation';

export class Colaborator {

    'id'?: number;
    'name': string;
	'status': string;
    'dependents': number;
    'simulations': Array<Simulation>;
    constructor(data?: any) {
        Object.assign(this, data);
    }
}