FROM node:12

ADD . .

ENV NODE_ENV=production

RUN npm i

EXPOSE 4000

CMD [ "npm", "run", "start:production" ]
