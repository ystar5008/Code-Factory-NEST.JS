#!/bin/bash

# JSON 파일 경로
json_file="명언.json"


# 랜덤으로 인덱스 선택
random_index=$(shuf -i 0-$(($(jq '. | length - 1' "$json_file") - 1)) -n 1)

# jq 명령어를 사용하여 랜덤한 명언 가져오기
random_quote=$(jq -r --argjson index "$random_index" '.[$index] | "Author: \(.author)\nMessage: \(.message)"' "$json_file")

# 결과 출력
echo "Random Quote:"
echo "$random_quote"

