# Zoom clone frontend

https://github.com/alexeygorbachevskiy/zoom-clone/assets/37103509/18105533-6624-4c46-8061-07cc0d552e85

## Deploy

- https://zoom-clone-frontend-alexeygorbachevskiys-projects.vercel.app/

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing

```
1. yarn install 
2. yarn start
3. Configure SSL certificate as described below.
4. Create channel with name "zoom-clone" via Pusher. See https://dashboard.pusher.com/.
5. Create account in https://dashboard.metered.ca/ for TURN server using.
6. Rename .env.example file to .env and fill in all blanks.
```

## Configure SSL
You need to create a `.cert` folder in the root directory of the repo and put `cert.pem` and `key.pem` in it.
See links below for ssl configuration.

### SSL configuration links
- https://github.com/FiloSottile/mkcert
- https://chocolatey.org/install
- https://www.freecodecamp.org/news/how-to-set-up-https-locally-with-create-react-app/
```
For firefox: mkcert -CAROOT. Check location of rootCA.crt and import it manually to firefox certificates
``` 
