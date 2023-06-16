FROM node:14-slim

WORKDIR ./

COPY package.json ./
COPY package-lock.json ./
RUN npm install 

COPY . ./

CMD ["npm", "start"]