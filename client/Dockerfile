FROM node:14-slim

WORKDIR ./

COPY ./package.json ./

COPY ./package-lock.json ./

RUN npm install 

COPY . .

EXPOSE 3000

ENTRYPOINT [ "npm" ]

CMD ["start"]