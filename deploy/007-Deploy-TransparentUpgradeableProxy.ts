import { DeployFunction, DeploymentsExtension } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // contracts/openzeppelin/Contracts.sol
  await deploy("TransparentUpgradeableProxy", {
    from: deployer,
    args: Object.values(await getContractArgs(hre.deployments)),
    log: true,
    waitConfirmations: 1,
  });
};
export default func;
func.id = "007-Deploy-TransparentUpgradeableProxy";
func.tags = ["Uniswap"];

async function getContractArgs(deployments: DeploymentsExtension) {
  const logic = (await deployments.get("NonfungibleTokenPositionDescriptor")).address;
  const admin = (await deployments.get("ProxyAdmin")).address;
  const data = "0x";

  return { logic, admin, data };
}
