import fs from "fs-extra";
import { ethers } from "hardhat";
import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // contracts/v3-periphery/NonfungibleTokenPositionDescriptor.sol
  await deploy("NonfungibleTokenPositionDescriptor", {
    from: deployer,
    args: Object.values(getContractArgs()),
    log: true,
    waitConfirmations: 1,
    libraries: {
      NFTDescriptor: (await hre.deployments.get("NFTDescriptor")).address,
    },
  });
};
export default func;
func.id = "006-Deploy-NonfungibleTokenPositionDescriptor";
func.tags = ["Uniswap"];

function getContractArgs() {
  const json = fs.readJSONSync("./deployargs/deployArgs.json");

  const WETH9 = String(json.weth);
  const nativeCurrencyLabelBytes = asciiStringToBytes32(String(json.nativeCurrencyLabel));

  return { WETH9, nativeCurrencyLabelBytes };
}

function isAscii(str: string): boolean {
  // eslint-disable-next-line no-control-regex
  return /^[\x00-\x7F]*$/.test(str);
}

function asciiStringToBytes32(str: string): string {
  if (str.length > 32 || !isAscii(str)) {
    throw new Error("Invalid label, must be less than 32 characters");
  }

  // write string to bytes32 using ethers
  return ethers.encodeBytes32String(str);
}
