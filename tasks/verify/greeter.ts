import fs from "fs-extra";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

task("verify:Greeter")
  .addParam("address", "The contract address")
  .setAction(async function (taskArguments: TaskArguments, hre) {
    const args = getContractArgs();

    await hre.run("verify:verify", {
      address: taskArguments.address,
      constructorArguments: Object.values(args),
    });
  });

function getContractArgs() {
  const json = fs.readJSONSync("./deployargs/deployGreeterArgs.json");

  const greeting = String(json.greeting);

  return { greeting: greeting };
}
