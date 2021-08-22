import { Thing } from "./thing";

export class CostOptimizer {
    private Things: Thing[];
    private MaxWeight: number;
    private KnapsackDPTable: number[][] = [];
    constructor(things: Thing[], maxWeight: number) {
        this.Things = things;
        this.MaxWeight = maxWeight;
        for (let i = 0; i < things.length + 1; i++) {
            this.KnapsackDPTable.push(new Array(maxWeight + 1).fill(-1))
        }
    }

    private generateKnapsackDPTable() {
        const totalCount = this.Things.length;       
        for (let currentCount = 1; currentCount <= totalCount; currentCount++) {
            for (let currentWeight = 0; currentWeight <= this.MaxWeight; currentWeight++) {
                this.KnapsackDPTable[currentCount][currentWeight] = this.KnapsackDPTable[currentCount - 1][currentWeight];
                const currentCost = this.KnapsackDPTable[currentCount][currentWeight];
                const newCost = this.KnapsackDPTable[currentCount - 1][currentWeight - this.Things[currentCount - 1].Weight] + this.Things[currentCount - 1].Cost;
                if (currentWeight >= this.Things[currentCount - 1].Weight && currentCost < newCost) {
                    this.KnapsackDPTable[currentCount][currentWeight] = newCost;
                }
            }
        }
    }

    private findOptimalSelection(): Thing[] {
        const selectedThings: Thing[] = [];
        let currentPosition = this.Things.length, currentWeight = this.MaxWeight;

        while (currentPosition != 0) {
            if (this.KnapsackDPTable[currentPosition][currentWeight] != this.KnapsackDPTable[currentPosition - 1][currentWeight]) {
                const currentThing = this.Things[currentPosition - 1];
                selectedThings.push(currentThing);
                currentWeight = currentWeight - currentThing.Weight;
            }
            currentPosition--;
        }
        return selectedThings;
    }


    getOptimalThingIndices() {
        this.generateKnapsackDPTable();
        const optimalSelection = this.findOptimalSelection();
        return optimalSelection.map(thing => thing.Index).sort().join(',') || "-";
    }
}
