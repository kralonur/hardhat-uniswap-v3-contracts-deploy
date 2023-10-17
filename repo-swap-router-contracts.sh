#!/usr/bin/env bash

# Root directory of app
ROOT_DIR=$(git rev-parse --show-toplevel)

# Path to swap-router-contracts
SWAP_ROUTER_CONTRACTS_PATH="${ROOT_DIR}/contracts/swap-router-contracts"

# Clean all existing generated files
rm -rf "${SWAP_ROUTER_CONTRACTS_PATH}"

mkdir "${SWAP_ROUTER_CONTRACTS_PATH}"

# Clone swap-router-contracts
cd "${SWAP_ROUTER_CONTRACTS_PATH}"
echo "Cloning swap-router-contracts ..."
git clone https://github.com/Uniswap/swap-router-contracts.git repo
cd repo
echo "Moving contracts ..."
git reset --hard 550c0f20373a487996fcc957075377b67af9df07
mv contracts/* "${SWAP_ROUTER_CONTRACTS_PATH}"
echo "Deleting leftovers ..."
rm -rf "${SWAP_ROUTER_CONTRACTS_PATH}/repo" # delete remaining of repo
rm -rf "${SWAP_ROUTER_CONTRACTS_PATH}/test" # test contracts are not needed

# GOTO "${ROOT_DIR}"
cd "${ROOT_DIR}"
