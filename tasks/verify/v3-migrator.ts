import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

task("verify:V3Migrator").setAction(async function (_taskArguments: TaskArguments, hre) {
  const deployment = await hre.deployments.get("V3Migrator");

  await hre.run("verify:verify", {
    address: deployment.address,
    constructorArguments: deployment.args ?? [],
  });
});
