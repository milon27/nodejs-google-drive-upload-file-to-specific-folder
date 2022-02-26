#!/usr/bin/bash

#run as sudo
DB_NAME='gql_ecom'

#taking the backup
mysqldump -u root $DB_NAME | gzip > backups/backup.sql.gz

# run the node app(upload into drive)
node index.js > log/output.txt