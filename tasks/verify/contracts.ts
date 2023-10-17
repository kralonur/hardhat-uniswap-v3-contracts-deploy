import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

task("verify:Contracts").setAction(async function (_taskArguments: TaskArguments, hre) {
  const deployments = await hre.deployments.all();

  for (const deploymentEntry of Object.entries(deployments)) {
    const deployment = deploymentEntry[1];
    console.log(`🚀 ~ verifying ${deploymentEntry[0]}: ${deployment.address} args: ${deployment.args}`);

    try {
      await hre.run("verify:verify", {
        address: deployment.address,
        constructorArguments: deployment.args ?? [],
      });
    } catch (error) {
      console.error(`🚀 ~ failed to verify ${deploymentEntry[0]}`);
      console.error(error);
    }
  }
});
