#!/bin/sh
start_time=$(date +%s)
end_time=$(date +%s)
echo "깃커밋을 실행합니다.$start_time"
git add . 
git commit -m "코드팩토리 강의"
git push origin master
echo "깃커밋을 종료합니다.$end_time