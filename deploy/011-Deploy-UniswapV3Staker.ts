import { DeployFunction, DeploymentsExtension } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const ONE_MINUTE_SECONDS = 60;
const ONE_HOUR_SECONDS = ONE_MINUTE_SECONDS * 60;
const ONE_DAY_SECONDS = ONE_HOUR_SECONDS * 24;
const ONE_MONTH_SECONDS = ONE_DAY_SECONDS * 30;
const ONE_YEAR_SECONDS = ONE_DAY_SECONDS * 365;

// 2592000
const MAX_INCENTIVE_START_LEAD_TIME = ONE_MONTH_SECONDS;
// 1892160000
const MAX_INCENTIVE_DURATION = ONE_YEAR_SECONDS * 2;

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // contracts/v3-staker/UniswapV3Staker.sol
  await deploy("UniswapV3Staker", {
    from: deployer,
    args: Object.values(await getContractArgs(hre.deployments)),
    log: true,
    waitConfirmations: 1,
  });
};
export default func;
func.id = "011-Deploy-UniswapV3Staker";
func.tags = ["Uniswap"];

async function getContractArgs(deployments: DeploymentsExtension) {
  const factory = (await deployments.get("UniswapV3Factory")).address;
  const nonfungiblePositionManager = (await deployments.get("NonfungiblePositionManager")).address;
  const maxIncentiveStartLeadTime = MAX_INCENTIVE_START_LEAD_TIME;
  const maxIncentiveDuration = MAX_INCENTIVE_DURATION;

  return { factory, nonfungiblePositionManager, maxIncentiveStartLeadTime, maxIncentiveDuration };
}
