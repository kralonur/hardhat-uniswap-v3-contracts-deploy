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

  if (owner !== (await signer.getAddress())) {
    throw new Error("UniswapV3Factory.owner is not signer");
  }

  const ONE_BP_FEE = 100;
  const ONE_BP_TICK_SPACING = 1;

  const tx = await uniswapV3FactoryContract.enableFeeAmount(ONE_BP_FEE, ONE_BP_TICK_SPACING);
  const receipt = await tx.wait();

  if (!receipt) {
    throw new Error("UniswapV3Factory.enableFeeAmount failed");
  }

  console.log(
    `UniswapV3Factory added a new fee tier ${ONE_BP_FEE / 100} bps with tick spacing ${ONE_BP_TICK_SPACING}. Hash: ${
      receipt.hash
    }`,
  );
};
export default func;
func.id = "001-Add-1BP_Fee_Tier";
func.tags = ["Uniswap"];
