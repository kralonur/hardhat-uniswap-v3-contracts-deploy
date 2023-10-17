import fs from "fs-extra";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  const greeter = await deploy("Greeter", {
    from: deployer,
    args: Object.values(getContractArgs()),
    log: true,
  });

  console.log(`Greeter contract: `, greeter.address);
};
export default func;
func.id = "deploy_greeter"; // id required to prevent reexecution
func.tags = ["Greeter"];

function getContractArgs() {
  const json = fs.readJSONSync("./deployargs/deployGreeterArgs.json");

  const greeting = String(json.greeting);

  return { greeting: greeting };
}
