import { exit } from "process";
import { Packer } from "./packer";

const inputFileUrl = "E:/Mobiquity Code Challange JavaScript/skeleton_javascript/resources/example_input";

function main() {
  Packer.pack(inputFileUrl).subscribe(
    {
      next: selectedIndices => {
        console.log(selectedIndices);
      },
      error: (error: Error) => {
        console.log(error)
      },
      complete: () => {
        exit(0);
      }
    }
  );
}

main();


