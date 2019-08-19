export class Margin{

    'id'?:number;
    'margin-min': number;
    'margin-max': number;

    constructor(data?: any) {
        Object.assign(this, data);
    }
}