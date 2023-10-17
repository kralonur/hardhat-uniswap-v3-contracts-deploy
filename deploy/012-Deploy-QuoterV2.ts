import fs from "fs-extra";
import { DeployFunction, DeploymentsExtension } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // contracts/swap-router-contracts/lens/QuoterV2.sol
  await deploy("QuoterV2", {
    contract: "contracts/swap-router-contracts/lens/QuoterV2.sol:QuoterV2",
    from: deployer,
    args: Object.values(await getContractArgs(hre.deployments)),
    log: true,
    waitConfirmations: 1,
  });
};
export default func;
func.id = "012-Deploy-QuoterV2";
func.tags = ["Uniswap"];

async function getContractArgs(deployments: DeploymentsExtension) {
  const json = fs.readJSONSync("./deployargs/deployArgs.json");

  const factory = (await deployments.get("UniswapV3Factory")).address;
  const WETH9 = String(json.weth);

  return { factory, WETH9 };
}
