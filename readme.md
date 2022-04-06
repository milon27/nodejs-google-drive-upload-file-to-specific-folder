# upload backup or any file into google drive

## **How to use with docker compose**

```yml
# docker-compose.yml

version: '3.4'
services:
  node_drive:
    container_name: node_drive
    image: milon27/node_drive
    environment:
      - BACKUP_FILE_NAME=backup.txt
      - BACKUP_FILE_MIMETYPE=text/css
      - DRIVE_FOLDER_ID=YOUR_DRIVE_FOLDER_ID
      - CREDENTIAL_FILE_NAME=credentials.json
    volumes:
      - ./local_config:/app/config

```

- Environment variables
    - BACKUP_FILE_NAME: Name of the file which will upload
    - BACKUP_FILE_MIMETYPE: File type which will be uploaded into the drive
    - DRIVE_FOLDER_ID: Get the drive folder ID from the URL: https://drive.google.com/drive/u/0/folders/[FOLDER_ID]
    - CREDENTIAL_FILE_NAME: OAuth2 credential file name

- Configuration files
   - create a folder in your host machine called /local_config
   - put credentials.json file (check How to get credential.json)
   - put token.json file
   - generate your backup file or put it in the /local_config folder

- How to **get credential.json** file
  - Create a google cloud console project
  - Enable drive API
  - Setup OAuth consent screen
  - Create OAuth2 credentials
  - Download the credentials JSON file and rename it as credential.json
  - Put it in the /local_config folder

- How to **get token.json** file
  - ```docker compose run --rm node_drive node index.js```
  - run this docker compose run command first time it will print a link in the console or terminal. copy the link and paste it into the browser authorized with your Gmail account.
  - It will give you a token, copy that token from the browser and paste the key into the terminal
  - done, it will automatically generate the token.json file based on the ./local_config/ directory.

---

##  **How to use without docker**
- link: https://github.com/milon27/nodejs-google-drive-upload-file-to-specific-folder#readme

---

### Contact Me Here
https://milon27.com