#!/usr/bin/env bash

# Root directory of app
ROOT_DIR=$(git rev-parse --show-toplevel)

# Path to v3-staker
V3_STAKER_PATH="${ROOT_DIR}/contracts/v3-staker"

# Clean all generated files
rm -rf "${V3_STAKER_PATH}"

mkdir "${V3_STAKER_PATH}"

# Clone v3-staker
cd "${V3_STAKER_PATH}"
echo "Cloning v3-staker ..."
git clone https://github.com/Uniswap/v3-staker repo
cd repo
echo "Moving contracts ..."
git reset --hard 4328b957701de8bed83689aa22c32eda7928d5ab
mv contracts/* "${V3_STAKER_PATH}"
echo "Deleting leftovers ..."
rm -rf "${V3_STAKER_PATH}/repo" # delete remaining of repo
rm -rf "${V3_STAKER_PATH}/test" # test contracts are not needed

# GOTO "${ROOT_DIR}"
cd "${ROOT_DIR}"
