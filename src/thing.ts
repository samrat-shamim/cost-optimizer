export class Thing {
    Index: number;
    Weight: number;
    Cost: number;
    CostPerUnit: number;
    constructor(indexWeightCostStr: string) {
        const [index, weight, cost] = indexWeightCostStr
            .slice(1, indexWeightCostStr.length - 1)
            .split(',');
        this.Index = +index;
        this.Weight = (+weight) * 100;
        this.Cost = +cost.slice(1);
        this.CostPerUnit = this.Cost/this.Weight;
    }
    toString = () => {
        return `Index: ${this.Index}, Weight: ${this.Weight}, Cost: ${this.Cost}, CostPerUnit: ${this.CostPerUnit}`;
    }
}



