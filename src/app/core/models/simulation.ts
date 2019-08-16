import { Extras } from './extras';

export class Simulation {

    'id'?: number;
    'baseSalary': number;
    'foodSubsidy': number;
    'phone': number;
    'vehicle': number;
    'fuel': number;
    'healthInsurance': number;
    'workInsurance': number;
    'mobileNet': number;
    'zPass': number;
    'otherWithTA': number;
    'vehicleMaintenance': number;
    'otherWithoutTA': number;
    'otherAwards': number;
    'extras': Array<Extras>;

    constructor(data?: any) {
        Object.assign(this, data);
    }
}
