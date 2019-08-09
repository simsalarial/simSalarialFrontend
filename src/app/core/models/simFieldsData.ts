export class SimFieldsData {
    
    'id'?: number;
    'name': string;
    'value': number;
    'result'?: number;

    constructor(data?: any) {
        Object.assign(this, data);
    }
}
