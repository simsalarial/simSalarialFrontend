export class Margin{

    'id'?:number;
    'margin_min': number;
    'margin_max': number;

    constructor(data?: any) {
        Object.assign(this, data);
    }
}
