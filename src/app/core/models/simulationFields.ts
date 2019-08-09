export class SimulationFields {
    
    'id'?: number;
    'name': string;
    'SA': number;
    'IRS': number;
    'SS': number;
    'TA': number;
    'BE': number;
    'varComponent': number;

    constructor(data?: any) {
        Object.assign(this, data);
    }
}
