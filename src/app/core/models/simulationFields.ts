export class SimulationFields {
    
    'id'?: number;
    'name': string;
    'SA': boolean;
    'IRS': boolean;
    'SS': boolean;
    'TA': boolean;
    'BE': boolean;
    'varComponent': boolean;

    constructor(data?: any) {
        Object.assign(this, data);
    }
}
