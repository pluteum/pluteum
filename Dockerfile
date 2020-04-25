FROM node:12

RUN apt-get update && apt-get install libpng-dev
RUN npm set unsafe-perm true
RUN npm install -g cross-env pngquant

EXPOSE 3000

CMD ["npm", "run", "start"]
