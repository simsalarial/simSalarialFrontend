export class WorkInsurance {

    'id'?: number;
    'workInsuranceVariable': number;
    'varAccountedForWorkInsurance': number;

    constructor(data?: any) {
        Object.assign(this, data);
    }
}
