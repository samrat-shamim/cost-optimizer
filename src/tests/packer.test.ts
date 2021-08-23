import { ApiError } from "../classes/error";
import { Packer } from "../classes/packer";

test('should throw error for invalid weight', () => {
    const invalidInput = "60 : (1,10.1.23,€60) (2,20.221,€100) (3,30.32,€120)";
    expect(() => {
        Packer.validateInputAndPrepareTestCase(invalidInput)
    }).toThrow(new ApiError(`Invalid weight 10.1.23 for index 2`));
});

test('should throw error for invalid cost', () => {
    const invalidInput = "60 : (1,10.23,€60) (2,20.21,€10a0) (3,30.32,€120)";
    expect(() => {
        Packer.validateInputAndPrepareTestCase(invalidInput)
    }).toThrow(new ApiError(`Invalid cost €10a0 for index 2`));
});


test('should convert the weight to fixed decimal and multiplied by 100', () => {
    const correctInput = "60 : (1,10.23555,€60) (2,20.21,€100) (3,30.32,€120)";
    const testCase = Packer.validateInputAndPrepareTestCase(correctInput);
    expect(testCase.Things[0].Weight).toBe(1024);
});

test('should set property CostPerUnit', () => {
    const correctInput = "60 : (1,10.23555,€60) (2,20.21,€100) (3,30.32,€120)";
    const testCase = Packer.validateInputAndPrepareTestCase(correctInput);
    expect(testCase.Things[0].CostPerUnit).toBe(60/1024);
});