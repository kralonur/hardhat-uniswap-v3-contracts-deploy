import fs from "fs-extra";
import { DeployFunction, DeploymentsExtension } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // contracts/v3-periphery/SwapRouter.sol
  await deploy("SwapRouter", {
    from: deployer,
    args: Object.values(await getContractArgs(hre.deployments)),
    log: true,
    waitConfirmations: 1,
  });
};
export default func;
func.id = "014-Deploy-SwapRouter";
func.tags = ["Uniswap"];

async function getContractArgs(deployments: DeploymentsExtension) {
  const json = fs.readJSONSync("./deployargs/deployArgs.json");

  const factory = (await deployments.get("UniswapV3Factory")).address;
  const WETH9 = String(json.weth);

  return { factory, WETH9 };
}
