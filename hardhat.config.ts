import "@nomicfoundation/hardhat-toolbox";
import { config as dotenvConfig } from "dotenv";
import fs from "fs";
import "hardhat-deploy";
import "hardhat-tracer";
import type { HardhatUserConfig } from "hardhat/config";
import type { NetworkUserConfig, SolcUserConfig } from "hardhat/types";
import path, { resolve } from "path";

import "./tasks/accounts";
import "./tasks/verify";

const dotenvConfigPath: string = process.env.DOTENV_CONFIG_PATH || "./.env";
dotenvConfig({ path: resolve(__dirname, dotenvConfigPath) });

// Ensure that we have all the environment variables we need.
const mnemonic: string | undefined = process.env.MNEMONIC;
if (!mnemonic) {
  throw new Error("Please set your MNEMONIC in a .env file");
}

const infuraApiKey: string | undefined = process.env.INFURA_API_KEY;
if (!infuraApiKey) {
  throw new Error("Please set your INFURA_API_KEY in a .env file");
}

const cmcApiKey = process.env.CMC_API_KEY || "";

const reportGas: boolean = process.env.REPORT_GAS === "true";

const chainIds = {
  "arbitrum-mainnet": 42161,
  avalanche: 43114,
  bsc: 56,
  "bsc-testnet": 97,
  goerli: 5,
  hardhat: 31337,
  mainnet: 1,
  "optimism-mainnet": 10,
  "polygon-mainnet": 137,
  "polygon-mumbai": 80001,
  sepolia: 11155111,
  anvil: 31337,
  fuse: 122,
  spark: 123,
  pgn: 424,
  "pgn-testnet": 58008,
};

function getChainConfig(chain: keyof typeof chainIds): NetworkUserConfig {
  let jsonRpcUrl: string;
  let gasPrice: number;
  switch (chain) {
    case "avalanche":
      jsonRpcUrl = "https://api.avax.network/ext/bc/C/rpc";
      break;
    case "fuse":
      jsonRpcUrl = "https://rpc.fuse.io";
      break;
    case "spark":
      jsonRpcUrl = "https://rpc.fusespark.io";
      break;
    case "pgn":
      jsonRpcUrl = "https://rpc.publicgoods.network";
      break;
    case "pgn-testnet":
      jsonRpcUrl = "https://sepolia.publicgoods.network/";
      gasPrice = 1000000000; // 1 gwei
      break;
    case "bsc":
      jsonRpcUrl = "https://bsc-dataseed1.binance.org";
      break;
    case "bsc-testnet":
      jsonRpcUrl = "https://data-seed-prebsc-1-s1.binance.org:8545";
      break;
    case "anvil":
      jsonRpcUrl = "http://127.0.0.1:8545";
      break;
    default:
      jsonRpcUrl = "https://" + chain + ".infura.io/v3/" + infuraApiKey;
  }
  return {
    accounts: {
      count: 10,
      mnemonic,
      path: "m/44'/60'/0'/0",
    },
    chainId: chainIds[chain],
    url: jsonRpcUrl,
    gasPrice: gasPrice || "auto",
  };
}

const swapRouterContractsCompiler = {
  version: "0.7.6",
  settings: {
    metadata: {
      bytecodeHash: "none",
    },
    evmVersion: "istanbul",
    optimizer: {
      enabled: true,
      runs: 1_000_000,
    },
  },
};

const v3CoreCompiler = {
  version: "0.7.6",
  settings: {
    metadata: {
      bytecodeHash: "none",
    },
    optimizer: {
      enabled: true,
      runs: 800,
    },
  },
};

const v3PeripheryDefaultCompiler = {
  version: "0.7.6",
  settings: {
    metadata: {
      bytecodeHash: "none",
    },
    evmVersion: "istanbul",
    optimizer: {
      enabled: true,
      runs: 1_000_000,
    },
  },
};

const v3PeripheryLowCompiler = {
  version: "0.7.6",
  settings: {
    metadata: {
      bytecodeHash: "none",
    },
    evmVersion: "istanbul",
    optimizer: {
      enabled: true,
      runs: 2_000,
    },
  },
};

const v3PeripheryLowestCompiler = {
  version: "0.7.6",
  settings: {
    metadata: {
      bytecodeHash: "none",
    },
    evmVersion: "istanbul",
    optimizer: {
      enabled: true,
      runs: 1_000,
    },
  },
};

const v3StakerCompiler = {
  version: "0.7.6",
  settings: {
    metadata: {
      bytecodeHash: "none",
    },
    optimizer: {
      enabled: true,
      runs: 1_000_000,
    },
  },
};

const configs: Record<string, SolcUserConfig> = {};

getSolFiles("contracts/swap-router-contracts").forEach((path) => (configs[path] = swapRouterContractsCompiler));
getSolFiles("contracts/v3-core").forEach((path) => (configs[path] = v3CoreCompiler));
getSolFiles("contracts/v3-periphery").forEach((path) => (configs[path] = v3PeripheryDefaultCompiler));
getSolFiles("contracts/v3-staker").forEach((path) => (configs[path] = v3StakerCompiler));

// overrides from v3-periphery

configs["contracts/v3-periphery/NonfungiblePositionManager.sol"] = v3PeripheryLowCompiler;
configs["contracts/v3-periphery/NonfungibleTokenPositionDescriptor.sol"] = v3PeripheryLowestCompiler;
configs["contracts/v3-periphery/libraries/NFTDescriptor.sol"] = v3PeripheryLowestCompiler;

function getSolFiles(directoryPath: string): string[] {
  const files: string[] = [];

  const contents = fs.readdirSync(directoryPath);

  for (const item of contents) {
    const itemPath = path.join(directoryPath, item);
    const isDirectory = fs.statSync(itemPath).isDirectory();

    if (isDirectory) {
      files.push(...getSolFiles(itemPath));
    } else if (path.extname(item) === ".sol") {
      files.push(itemPath);
    }
  }

  return files;
}

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  namedAccounts: {
    deployer: 0,
  },
  etherscan: {
    apiKey: {
      arbitrumOne: process.env.ARBISCAN_API_KEY || "",
      avalanche: process.env.SNOWTRACE_API_KEY || "",
      bsc: process.env.BSCSCAN_API_KEY || "",
      bscTestnet: process.env.BSCSCAN_API_KEY || "",
      goerli: process.env.ETHERSCAN_API_KEY || "",
      mainnet: process.env.ETHERSCAN_API_KEY || "",
      optimisticEthereum: process.env.OPTIMISM_API_KEY || "",
      polygon: process.env.POLYGONSCAN_API_KEY || "",
      polygonMumbai: process.env.POLYGONSCAN_API_KEY || "",
      sepolia: process.env.ETHERSCAN_API_KEY || "",
    },
  },
  gasReporter: {
    currency: "USDC",
    coinmarketcap: cmcApiKey,
    enabled: reportGas,
    excludeContracts: [],
    src: "./contracts",
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic,
      },
      chainId: chainIds.hardhat,
    },
    arbitrum: getChainConfig("arbitrum-mainnet"),
    avalanche: getChainConfig("avalanche"),
    bsc: getChainConfig("bsc"),
    "bsc-testnet": getChainConfig("bsc-testnet"),
    goerli: getChainConfig("goerli"),
    mainnet: getChainConfig("mainnet"),
    optimism: getChainConfig("optimism-mainnet"),
    "polygon-mainnet": getChainConfig("polygon-mainnet"),
    "polygon-mumbai": getChainConfig("polygon-mumbai"),
    sepolia: getChainConfig("sepolia"),
    anvil: getChainConfig("anvil"),
    fuse: getChainConfig("fuse"),
    spark: getChainConfig("spark"),
    pgn: getChainConfig("pgn"),
    "pgn-testnet": getChainConfig("pgn-testnet"),
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
    deploy: "./deploy",
    deployments: "./deployments",
  },
  solidity: {
    compilers: [
      {
        version: "0.7.6",
        settings: {
          metadata: {
            bytecodeHash: "none",
          },
          evmVersion: "istanbul",
          optimizer: {
            enabled: true,
            runs: 1_000_000,
          },
        },
      },
    ],
    overrides: configs,
  },
  typechain: {
    outDir: "types",
    target: "ethers-v6",
  },
};

export default config;
