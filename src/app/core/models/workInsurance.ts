export class WorkInsurance {

    'id'?: number;
    'workInsurancevariable': number;
    'varAccountedForWorkInsurance': number;

    constructor(data?: any) {
        Object.assign(this, data);
    }
}
