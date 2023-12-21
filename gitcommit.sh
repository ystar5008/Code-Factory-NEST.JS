#!/bin/sh
echo "깃커밋을 실행합니다.$(date +%s)"
git add . 
git commit -m "코드팩토리 강의"
git push origin master
echo "깃커밋을 종료합니다.$(date +%s)"