import fs from "fs-extra";
import { ethers } from "hardhat";
import { DeployFunction, DeploymentsExtension } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // contracts/swap-router-contracts/SwapRouter02.sol
  await deploy("SwapRouter02", {
    from: deployer,
    args: Object.values(await getContractArgs(hre.deployments)),
    log: true,
    waitConfirmations: 1,
  });
};
export default func;
func.id = "014-Deploy-SwapRouter02";
func.tags = ["Uniswap"];

async function getContractArgs(deployments: DeploymentsExtension) {
  const json = fs.readJSONSync("./deployargs/deployArgs.json");

  const factoryV2 = ethers.isAddress(String(json.v2CoreFactory)) ? String(json.v2CoreFactory) : ethers.ZeroAddress;
  const factoryV3 = (await deployments.get("UniswapV3Factory")).address;
  const positionManager = (await deployments.get("NonfungiblePositionManager")).address;
  const WETH9 = String(json.weth);

  return { factoryV2, factoryV3, positionManager, WETH9 };
}
