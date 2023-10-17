import fs from "fs-extra";
import { task } from "hardhat/config";

import type { TaskArguments } from "hardhat/types";

task("deploy:Greeter")
  .setAction(async function (_taskArguments: TaskArguments, { ethers }) {
    const signers = await ethers.getSigners();
    const factory = await ethers.getContractFactory("Greeter");
    const args = getContractArgs();
    const contract = await factory.connect(signers[0]).deploy(args.greeting);
    await contract.waitForDeployment();
    console.log("Greeter deployed to: ", await contract.getAddress());
  });

  function getContractArgs() {
    const json = fs.readJSONSync("./deployargs/deployGreeterArgs.json");

    const greeting = String(json.greeting);

    return { greeting: greeting };
  }
