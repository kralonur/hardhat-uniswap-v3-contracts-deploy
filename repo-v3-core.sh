#!/usr/bin/env bash

# Root directory of app
ROOT_DIR=$(git rev-parse --show-toplevel)

# Path to v3-core
V3_CORE_PATH="${ROOT_DIR}/contracts/v3-core"

# Clean all generated files
rm -rf "${V3_CORE_PATH}"

mkdir "${V3_CORE_PATH}"

# Clone v3-core
cd "${V3_CORE_PATH}"
echo "Cloning v3-core ..."
git clone https://github.com/Uniswap/v3-core.git repo
cd repo
echo "Moving contracts ..."
git reset --hard d8b1c635c275d2a9450bd6a78f3fa2484fef73eb
mv contracts/* "${V3_CORE_PATH}"
echo "Deleting leftovers ..."
rm -rf "${V3_CORE_PATH}/repo" # delete remaining of repo
rm -rf "${V3_CORE_PATH}/test" # test contracts are not needed

# GOTO "${ROOT_DIR}"
cd "${ROOT_DIR}"
