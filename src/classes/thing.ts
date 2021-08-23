import { ApiError } from "./error";

export class Thing {
    Index: number;
    Weight: number;
    Cost: number;
    CostPerUnit: number;
    constructor(indexWeightCostStr: string) {
        const [index, weight, cost] = indexWeightCostStr
            .slice(1, indexWeightCostStr.length - 1)
            .split(',');
        if (!+index){
            throw new ApiError(`Invalid index ${index}`)
        }
        this.Index = +index;
        if (!+weight){
            throw new ApiError(`Invalid weight ${weight} for index ${index}`)
        }
        // converting to fixed decimal and multiplying to get an integer to comply with the overlappling subproblem criterion of dynamic programming
        this.Weight = +(+weight).toFixed(2) * 100;
        this.Cost = +cost.slice(1);
        if (!this.Cost){
            throw new ApiError(`Invalid cost ${cost} for index ${index}`)
        }
        this.CostPerUnit = this.Cost/this.Weight;
    }
    toString = () => {
        return `Index: ${this.Index}, Weight: ${this.Weight}, Cost: ${this.Cost}, CostPerUnit: ${this.CostPerUnit}`;
    }
}



