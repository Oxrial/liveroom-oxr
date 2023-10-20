#!/bin/bash
CRTDIR=$(pwd)
echo $CRTDIR
if [ ! -d "$CRTDIR/api/data" ];then
echo "no data folder, start xtar db"
mkdir $CRTDIR/api/data
tar -zxf $CRTDIR/api/db/pgdb*.tar.gz $CRTDIR/api/data
else
echo "exite data folder"
fi