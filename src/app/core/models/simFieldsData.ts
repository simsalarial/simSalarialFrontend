export class SimFieldsData {
    
    'id'?: number;
    'name': string;
    'value': number;
    'tA'?: boolean;
    'result'?: number;

    constructor(data?: any) {
        Object.assign(this, data);
    }
}
