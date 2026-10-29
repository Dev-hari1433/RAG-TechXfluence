#!/usr/bin/env bash
# Exit immediately if a command exits with a non-zero status
set -e

echo "=== Installing Dependencies ==="
pip install --upgrade pip setuptools wheel
pip install -e libs/kotaemon
pip install -e libs/ktem

echo "=== Build Complete ==="
