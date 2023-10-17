import fs from "fs-extra";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { UniswapV3Factory__factory } from "../types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { ethers } = hre;
  const signers = await ethers.getSigners();
  const signer = signers[0];

  const deployment = await hre.deployments.get("UniswapV3Factory");

  const uniswapV3FactoryContract = UniswapV3Factory__factory.connect(deployment.address, signers[0]);

  const owner = await uniswapV3FactoryContract.owner();

  const json = fs.readJSONSync("./deployargs/deployArgs.json");
  const ownerAddress = String(json.ownerAddress);

  if (owner === ownerAddress) {
    console.log(`UniswapV3Factory owned by ${ownerAddress} already`);
    return;
  }

  if (owner !== (await signer.getAddress())) {
    throw new Error("UniswapV3Factory.owner is not signer");
  }

  const tx = await uniswapV3FactoryContract.setOwner(ownerAddress);
  const receipt = await tx.wait();

  if (!receipt) {
    throw new Error("UniswapV3Factory.setOwner failed");
  }

  console.log(`UniswapV3Factory ownership set to ${ownerAddress}. Hash: ${receipt.hash}`);
};
export default func;
func.id = "010-Transfer-V3_Core_Factory_Owner";
func.tags = ["Uniswap"];
