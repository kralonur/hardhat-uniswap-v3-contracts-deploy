import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

task("verify:TickLens").setAction(async function (_taskArguments: TaskArguments, hre) {
  const deployment = await hre.deployments.get("TickLens");

  await hre.run("verify:verify", {
    address: deployment.address,
    constructorArguments: deployment.args ?? [],
  });
});
