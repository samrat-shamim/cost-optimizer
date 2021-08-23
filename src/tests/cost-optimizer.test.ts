import { CostOptimizer } from "../classes/cost-optimizer";
import { Packer } from "../classes/packer";

const testCaseOneStr = "81 : (1,53.38,€45) (2,88.62,€98) (3,78.48,€3) (4,72.30,€76) (5,30.18,€9) (6,46.34,€48)";
const testCaseOne = Packer.validateInputAndPrepareTestCase(testCaseOneStr);
const testCaseOneResult = "4";

const testCaseTwoStr = "56 : (1,90.72,€13) (2,33.80,€40) (3,43.15,€10) (4,37.97,€16) (5,46.81,€36) (6,48.77,€79) (7,81.80,€45) (8,19.36,€79) (9,6.76,€64)";
const testCaseTwo = Packer.validateInputAndPrepareTestCase(testCaseTwoStr);
const testCaseTwoResult = "8,9";


const testCaseThreeStr = "60 : (1,10.123,€60) (2,20.221,€100) (3,30.32,€120)";
const testCaseThree = Packer.validateInputAndPrepareTestCase(testCaseThreeStr);
const testCaseThreeResult = "2,3";


const testCaseFourStr = "8 : (1,15.3,€34)";
const testCaseFour = Packer.validateInputAndPrepareTestCase(testCaseFourStr);
const testCaseFourResult = "-";

test('knapsack test: simple 1', () => {
    const costOptimizer = new CostOptimizer(testCaseOne.Things, testCaseOne.MaxWeight);
    expect(costOptimizer.getOptimalThingIndices()).toBe(testCaseOneResult);
});

test('knapsack test: simple 2', () => {
    const costOptimizer = new CostOptimizer(testCaseTwo.Things, testCaseTwo.MaxWeight);
    expect(costOptimizer.getOptimalThingIndices()).toBe(testCaseTwoResult);
});

test('knapsack test: more than 2 precision', () => {
    const costOptimizer = new CostOptimizer(testCaseThree.Things, testCaseThree.MaxWeight);
    expect(costOptimizer.getOptimalThingIndices()).toBe(testCaseThreeResult);
});

test('knapsack test: should return empty result', () => {
    const costOptimizer = new CostOptimizer(testCaseFour.Things, testCaseFour.MaxWeight);
    expect(costOptimizer.getOptimalThingIndices()).toBe(testCaseFourResult);
});