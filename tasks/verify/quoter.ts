import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

task("verify:Quoter").setAction(async function (_taskArguments: TaskArguments, hre) {
  const deployment = await hre.deployments.get("Quoter");

  await hre.run("verify:verify", {
    address: deployment.address,
    constructorArguments: deployment.args ?? [],
  });
});
