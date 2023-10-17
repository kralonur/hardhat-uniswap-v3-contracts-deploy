#!/usr/bin/env bash

# Changing the permissions
chmod +rx repo-swap-router-contracts.sh
chmod +rx repo-v3-core.sh
chmod +rx repo-v3-periphery.sh
chmod +rx repo-v3-staker.sh

# Executing the scripts
./repo-swap-router-contracts.sh
./repo-v3-core.sh
./repo-v3-periphery.sh
./repo-v3-staker.sh
