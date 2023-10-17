import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

task("verify:ProxyAdmin").setAction(async function (_taskArguments: TaskArguments, hre) {
  const deployment = await hre.deployments.get("ProxyAdmin");

  await hre.run("verify:verify", {
    address: deployment.address,
    constructorArguments: deployment.args ?? [],
  });
});
