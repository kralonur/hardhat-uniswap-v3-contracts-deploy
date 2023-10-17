import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

task("verify:UniswapV3Staker").setAction(async function (_taskArguments: TaskArguments, hre) {
  const deployment = await hre.deployments.get("UniswapV3Staker");

  await hre.run("verify:verify", {
    address: deployment.address,
    constructorArguments: deployment.args ?? [],
  });
});
