FROM node:16-slim
RUN mkdir /app
COPY ./todo-backend /app/
RUN ls -l /app/
WORKDIR /app/
RUN npm install
EXPOSE 8080
EXPOSE 8443
CMD [ "npm" , "run", "start-prod" ]