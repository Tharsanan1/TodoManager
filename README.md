# TodoManager

Want to use an already deployed application? Go to https://13.127.232.225:8443/

## Build your own and deploy

1) Create `./todo-frontend/.env` file.

Add the following environment variables
```
REACT_APP_AUTH_DOMAIN=//Auth0 domain
REACT_APP_AUTH_CLIENT_ID=//Auth0 client id
```

2) Create `./todo-backend/.env` file.

Add the following environment variables
```
MONGO_USERNAME=// MongoDb username
MONGO_PASSWORD=// MongoDb password
DB_URL=// Mongo connection url
AUTH0_API_IDENTIFIER=// Auth0 api identifier
AUTH0_DOMAIN=// Auth0 domain
EMAIL_IDENTIFIER=// Auth0 accessToken email identifier
```

3) `sh run-prod.sh` it will start the server


## Use docker to up the server

1) Docker compose way: In the root diretory `docker-compose up`
2) Docker way: `docker build -t todo-manager . && docker run -p 8080:8080 -p 9443:9443 --env-file ./todo-backend/.env todo-manager`
3) Want to use a public image already published? `docker run -p 8080:8080 -p 8443:8443 --env-file ./todo-backend/.env tharsanan/todo-manager`




## Important
The certs used by the backend is publicly available in github. Please make sure to change the certs. If you are using docker image then use docker volume to mount your own certs to `/app/cert` directory of the container