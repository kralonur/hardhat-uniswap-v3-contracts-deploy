# Hardhat Uniswap V3 Contracts Deploy

This project is designed to follow the deployment steps of
[deploy-v3](https://github.com/Uniswap/deploy-v3/tree/b7aac0f1c5353b36802dc0cf95c426d2ef0c3252) with some minor changes.
The motivation behind creating this project is to gain a better understanding of the deployment process, make
verification easier, and have the ability to modify the contracts if necessary.

**Important Note:**

At the time of creating this repository, the latest commit of
[deploy-v3](https://github.com/Uniswap/deploy-v3/tree/b7aac0f1c5353b36802dc0cf95c426d2ef0c3252) does not include the
deployment of
[SwapRouter](https://github.com/Uniswap/v3-periphery/blob/697c2474757ea89fec12a4e6db16a574fe259610/contracts/SwapRouter.sol)
and
[Quoter](https://github.com/Uniswap/v3-periphery/blob/697c2474757ea89fec12a4e6db16a574fe259610/contracts/lens/Quoter.sol)
contracts. However, this repository contains the deployment of these contracts.

## Installation

### Pre Requisites

Before running any command, you need to create a .env file and set a BIP-39 compatible mnemonic as an environment
variable. Follow the example in .env.example. If you don't already have a mnemonic, use this
[website](https://iancoleman.io/bip39/) to generate one.

1. Install node and npm
2. Install yarn

```bash
npm install --global yarn
```

Check that Yarn is installed by running:

```bash
yarn --version
```

Then, proceed with installing dependencies:

```bash
yarn install
```

## Required Contracts for Deployment

This repo does not contains the contracts itself for deployment. You need to clone them. And for that scripts are
provided.

First you need to give required permissions to the scripts and then you can run them:

```bash
chmod +x ./repo-all.sh
./repo-all.sh
```

This script will clone the required contracts in the `./contracts` directory.

### Making future changes for contracts

If you want to make changes on uniswap contracts you should delete `# contracts` section of `.gitignore` file. Then the
contracts will be included on future commits.

## Usage/Examples

### Compile

Compile the smart contracts with Hardhat:

```bash
yarn compile
```

### TypeChain

Compile the smart contracts and generate TypeChain artifacts:

```bash
yarn typechain
```

### Lint Solidity and TypeScript

Lint the Solidity and TypeScript code (then check with prettier):

```bash
yarn lint
```

### Clean

Delete the smart contract artifacts, the coverage reports and the Hardhat cache:

```bash
yarn clean
```

### Available Tasks

To see available tasks from Hardhat:

```bash
npx hardhat
```

## Deployment

### Args

First you need to create a `.env` file using the `.env.example` file as a template.

Then you need to create `deployArgs.json` file in deploargs directory. You can use `deployArgs.example.json` as a
template.

### Deploy

To deploy run following:

```bash
yarn deploy:contracts --network {network}
```

### Verify

To verify the contracts first you need to deploy with given deploy script up.

Then you can run following:

```bash
yarn verify:contracts --network {network}
```

Or you can verify one contract at time:

```bash
yarn verify:{contract-name} --network {network}
```

All of the verify commands are available in `package.json` file.

## Contributing

[This website](https://commitlint.io/) can be helpful to write commit messages.
