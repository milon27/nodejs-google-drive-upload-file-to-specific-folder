## How to use it

documentation link: https://developers.google.com/drive/api/v3/quickstart/nodejs

>> setp 1: get the credentials.json

create a google cloud console project, enable drive api, setup oauth consent screen, create oauth2 credentials , download them and put into credentials.json file

>> setp 2: npm ci

>> step 3: npm run upload

>> setp 4: autorize the app using generated link then copy the token from browser and paste the key in the terminal

>> setp 5: from next time it will upload your files form backups folder

>> run the bash script in crontab at every minute and everyday at 4 am.
```
* * * * * bash /home/milon27/application/node-drive/script.sh
0 4 * * * bash /home/milon27/application/node-drive/script.sh
```

___

### Contact Me Here
https://milon27.com