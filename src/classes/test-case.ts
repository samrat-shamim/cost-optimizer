import { Thing } from "./thing";

export class TestCase {
    CaseNo: number;
    Things: Thing[];
    MaxWeight: number;
    constructor(caseNo: number, things: Thing[], maxWeight: number) {
        this.CaseNo = caseNo;
        this.Things = things;
        this.MaxWeight = maxWeight
    }
}

export class TestCaseResult {
    CaseNo: number;
    Result: string;
    constructor(caseNo: number, result: string) {
        this.CaseNo = caseNo;
        this.Result = result;
    }
}