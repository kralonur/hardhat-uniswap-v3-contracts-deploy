import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

task("verify:SwapRouter02").setAction(async function (_taskArguments: TaskArguments, hre) {
  const deployment = await hre.deployments.get("SwapRouter02");

  await hre.run("verify:verify", {
    address: deployment.address,
    constructorArguments: deployment.args ?? [],
  });
});
