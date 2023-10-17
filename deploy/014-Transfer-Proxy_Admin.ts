import fs from "fs-extra";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { ProxyAdmin__factory, UniswapV3Factory__factory } from "../types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { ethers } = hre;
  const signers = await ethers.getSigners();
  const signer = signers[0];

  const deployment = await hre.deployments.get("ProxyAdmin");

  const proxyAdminContract = ProxyAdmin__factory.connect(deployment.address, signers[0]);

  const owner = await proxyAdminContract.owner();

  const json = fs.readJSONSync("./deployargs/deployArgs.json");
  const ownerAddress = String(json.ownerAddress);

  if (owner === ownerAddress) {
    console.log(`ProxyAdmin owned by ${ownerAddress} already`);
    return;
  }

  if (owner !== (await signer.getAddress())) {
    throw new Error("ProxyAdmin.owner is not signer");
  }

  const tx = await proxyAdminContract.transferOwnership(ownerAddress);
  const receipt = await tx.wait();

  if (!receipt) {
    throw new Error("ProxyAdmin.transferOwnership failed");
  }

  console.log(`ProxyAdmin ownership set to ${ownerAddress}. Hash: ${receipt.hash}`);
};
export default func;
func.id = "014-Transfer-Proxy_Admin";
func.tags = ["Uniswap"];
