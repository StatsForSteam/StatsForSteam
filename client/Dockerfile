FROM node:14-slim

WORKDIR /home/callum/Documents/statsforsteam/

COPY ./package.json ./

COPY ./yarn.lock ./

RUN npm install 

COPY . .

EXPOSE 3000

ENTRYPOINT [ "npm" ]

CMD ["start"]