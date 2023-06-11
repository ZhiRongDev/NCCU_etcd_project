#!/bin/bash

echo "move to working directory"
read -p "Press Enter to continue..."
cd "$1"

source activate dsys_lab

echo "start host node.."
nohup node hosts-data-collector.js 192.168.0.170 &

for ((A=180; A<=250; A+=10)); do
  nohup node host-raw-data.js "192.168.0.$A" 30001 192.168.0.170 &
done

echo "Prepare to kill host process"
read -p "Press Enter to continue..."
for ((A=180; A<=250; A+=10)); do
  pkill -f "host$A"
done

echo "Prepare to kill collector process"
read -p "Press Enter to continue..."
pkill -f "collector"

echo "done."
read -p "Press Enter to continue..."
