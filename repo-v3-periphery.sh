#!/usr/bin/env bash

# Root directory of app
ROOT_DIR=$(git rev-parse --show-toplevel)

# Path to v3-periphery
V3_PERIPHERY_PATH="${ROOT_DIR}/contracts/v3-periphery"

# Clean all generated files
rm -rf "${V3_PERIPHERY_PATH}"

mkdir "${V3_PERIPHERY_PATH}"

# Clone v3-periphery
cd "${V3_PERIPHERY_PATH}"
echo "Cloning v3-periphery ..."
git clone https://github.com/Uniswap/v3-periphery.git repo
cd repo
echo "Moving contracts ..."
git reset --hard 697c2474757ea89fec12a4e6db16a574fe259610
mv contracts/* "${V3_PERIPHERY_PATH}"
echo "Deleting leftovers ..."
rm -rf "${V3_PERIPHERY_PATH}/repo" # delete remaining of repo
rm -rf "${V3_PERIPHERY_PATH}/test" # test contracts are not needed

# GOTO "${ROOT_DIR}"
cd "${ROOT_DIR}"
