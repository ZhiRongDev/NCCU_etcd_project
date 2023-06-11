#!/bin/bash

url=("http://127.0.0.1:30001/hdSimu/ASI/index.html?perf=2")
reg=("USA/" "EUR/" "ASI/")
srv=("index.html" "app" "fileupload")
pf=("?perf=0" "?perf=1" "?perf=2")

function random_curl {
    u=${1[$RANDOM % ${#1[@]}]}
    r=${2[$RANDOM % ${#2[@]}]}
    s=${3[$RANDOM % ${#3[@]}]}
    p=${4[$RANDOM % ${#4[@]}]}
    curl "$u$r$s$p"
}

for ((i=0; i<10; i++)); do
    random_curl url reg srv pf
done
