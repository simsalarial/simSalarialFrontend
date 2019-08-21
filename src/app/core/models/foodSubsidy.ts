export class FoodSubsidy {

    'id'?: number;
    'foodsubsidymonth': number;
    'averageDaysOfTheMonth'?: number;
    'limitValueForFoodSubsidy'?: number;

    constructor(data?: any) {
        Object.assign(this, data);
    }
}
