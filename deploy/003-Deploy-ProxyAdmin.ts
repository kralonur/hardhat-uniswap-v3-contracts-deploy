import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // contracts/openzeppelin/Contracts.sol
  await deploy("ProxyAdmin", {
    from: deployer,
    args: [],
    log: true,
    waitConfirmations: 1,
  });
};
export default func;
func.id = "003-Deploy-ProxyAdmin";
func.tags = ["Uniswap"];
