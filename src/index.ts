import { exit } from "process";
import { ApiError } from "./classes/error";
import { Packer } from "./classes/packer";

const inputFileUrl = "E:/Mobiquity Code Challange JavaScript/skeleton_javascript/resources/example_input1";

process.on('uncaughtException', (e: Error)=> {
  throw new ApiError(e.message);
})

function main() {
  Packer.pack(inputFileUrl).subscribe(
    {
      next: (selectedIndices: string) => {
        console.log(selectedIndices);
      },
      error: (error: Error) => {
        throw new ApiError(error.message)
      },
      complete: () => {
        exit(0);
      }
    }
  );
}

main();


