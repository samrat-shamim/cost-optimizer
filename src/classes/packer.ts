import * as readline from "readline";
import { Thing } from "./thing";
import { FileReader } from "./file-reader";
import { Observable, Subject } from "rxjs";
import { TestCase, TestCaseResult } from "./test-case";
import { ApiError } from "./error";
const { StaticPool } = require('node-worker-threads-pool');


export class Packer {
    private static parallelProcessingCount = 5;
    private static currentCase = 1;
    private static caseCompleted = 0;
    private static totalCase = 0;
    private static caseResultMap = new Map<number, string>();
    private static readCompleted = false;
    constructor() {
    }
    public static pack(inputFile: string): Observable<string> {
        const subject = new Subject<string>();
        const fileStream = FileReader.readFromFileSystem(inputFile);
        const rlInterface = readline.createInterface({
            input: fileStream
        })

        const workerPool = new StaticPool({
            size: this.parallelProcessingCount,
            task: './dist/workers/optimize-packaging.js'
        });

        rlInterface.on('line', line => {
            this.totalCase++;
            const testCase = this.validateInputAndPrepareTestCase(line);
            const thisRef = this;
            workerPool.exec(JSON.stringify(testCase)).then((testCaseResult: TestCaseResult) => {
                thisRef.caseCompleted++;
                thisRef.caseResultMap.set(testCaseResult.CaseNo, testCaseResult.Result)
                if (thisRef.totalCase === thisRef.caseCompleted && thisRef.readCompleted) {
                    subject.next(thisRef.prepareResult());
                    subject.complete();
                    workerPool.destroy();
                }
            });

        })

        rlInterface.on('close', () => {
            this.readCompleted = true;
        })

        rlInterface.on('error', (e) => {
            console.log(e);
            subject.error(e);
        })

        return subject.asObservable();
    }

    public static validateInputAndPrepareTestCase(inputString: string): TestCase {
        const [maxWeight, thingsStr] = inputString.split(":");
        if (!+maxWeight) {
            throw new ApiError("Invalid max weight");
        }
        const things: Thing[] = thingsStr
            .trim()
            .split(" ")
            .map((thingStr: string) => (new Thing(thingStr)));


        things.sort((a, b) => {
            if (a.CostPerUnit < b.CostPerUnit) {
                return 1;
            } else if (a.CostPerUnit > b.CostPerUnit) {
                return -1;
            }
            return 0;
        })
        return new TestCase(this.currentCase++, things, (+maxWeight) * 100);
    }

    private static prepareResult(): string {
        let result = "";
        for (let i = 1; i <= this.totalCase; i++) {
            result += this.caseResultMap.get(i);
            result += '\n'
        }
        return result;
    }

}
