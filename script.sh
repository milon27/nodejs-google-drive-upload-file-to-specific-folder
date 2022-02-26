#run as sudo
DB_NAME='gql_ecom'
OUTPUT_PATH='/home/milon27/mylog/output.txt'

#taking the backup
mysqldump -u root $DB_NAME | gzip > backups/backup.sql.gz

# run the node app(upload into drive)
node index.js > $OUTPUT_PATH