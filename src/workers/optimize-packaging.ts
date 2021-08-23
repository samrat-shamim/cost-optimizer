import { CostOptimizer } from "../classes/cost-optimizer";
import { TestCase, TestCaseResult } from "../classes/test-case";

const { parentPort } = require('worker_threads');


parentPort.on("message", (testCaseJSONStr: string) => {
    const testCase: TestCase = JSON.parse(testCaseJSONStr);
    const costOptimizer = new CostOptimizer(testCase.Things, testCase.MaxWeight)
    parentPort.postMessage(new TestCaseResult(testCase.CaseNo, costOptimizer.getOptimalThingIndices()))
})

