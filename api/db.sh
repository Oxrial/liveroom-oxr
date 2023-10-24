#!/bin/bash
# echo "=== start rm old tar db ==="
IFS=$'\n'
# for f in `find db/ -maxdepth 1 -name "pgdb*.tar.gz"`
# do
#     echo $f
#     rm -rf $f
# done
# echo "=== end rm old tar db ==="
# echo "=== start tar db ==="
# ldate=`date +%Y-%m-%d_%H%M%S`
# echo ">>>" $ldate
# tar -czf db/pgdb$ldate.tar.gz data
# echo "=== end tar db ==="
# lconer=liveroom-oxr_devcontainer-api-1
# while getopts ":o:i" opt &> /dev/null;
# do
#     case $opt in
#         o)
#         ldate=`date +%Y-%m-%d_%H%M%S`
#         echo db$ldate.sql
#         docker exec -it $lconer pg_dump -U postgres -h 192.168.100.10 -p 5432 -f /var/lib/postgresql/data/db$ldate.sql postgres
#         docker cp $lconer:/var/lib/postgresql/data/db$ldate.sql ./db/
#         read -n 1
#         exit 1
#         ;;
#         i)
#         for file in ./db/*.sql;
#         do
#             # 检查文件是否存在
#             if [ -f "$file" ]; then
#                 # 复制文件到容器的tmp目录下
#                 docker cp "$file" "$lconer::/var/lib/postgresql/tmp/"
#                 docker exec $lconer sh -c "exec psql -U postgres -d postgres < $file"
#             fi
#         done
#         exit 1
#         ;;
#         ?)
#         echo "unknown"
#         ;;
#     esac
# done
# echo press any key
# read -n 1

docker exec -it liveroom-oxr_devcontainer-api-1 pg_dump -U postgres -h 192.168.100.10 -p 5432 -f /var/lib/postgresql/data/db.sql postgres
docker cp liveroom-oxr_devcontainer-api-1:/var/lib/postgresql/data/db.sql "E:\Dev\Project\Dev\Custom\liveroom-oxr\api\db\"


docker cp "$file" "liveroom-oxr_devcontainer-api-1::/var/lib/postgresql/tmp/"
docker exec liveroom-oxr_devcontainer-api-1 sh -c "exec psql -U postgres -d postgres < $file"
