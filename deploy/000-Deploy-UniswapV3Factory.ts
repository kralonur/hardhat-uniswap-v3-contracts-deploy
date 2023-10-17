import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // contracts/v3-core/UniswapV3Factory.sol
  await deploy("UniswapV3Factory", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: 1,
  });
};
export default func;
func.id = "000-Deploy-UniswapV3Factory";
func.tags = ["Uniswap"];
