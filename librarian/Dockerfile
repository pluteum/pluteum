FROM node:12

ADD . .

RUN npm i
RUN npm run build

ENV NODE_ENV=production

EXPOSE 4000

CMD [ "npm", "run", "start:production" ]
