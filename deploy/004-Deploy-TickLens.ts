import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // contracts/v3-periphery/lens/TickLens.sol
  await deploy("TickLens", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: 1,
  });
};
export default func;
func.id = "004-Deploy-TickLens";
func.tags = ["Uniswap"];
