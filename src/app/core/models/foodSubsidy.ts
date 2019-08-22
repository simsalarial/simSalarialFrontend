export class FoodSubsidy {

    'id'?: number;
    'foodSubsidyMonth': number;
    'averageDaysOfTheMonth'?: number;
    'limitValueForFoodSubsidy'?: number;

    constructor(data?: any) {
        Object.assign(this, data);
    }
}
