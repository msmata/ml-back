FROM node:16-alpine

RUN apk update && \
    apk add --update git && \
    apk add --update openssh

# Build
RUN git clone https://github.com/msmata/ml-back.git
WORKDIR /ml-back
RUN rm jest.config.ts
RUN yarn install
RUN yarn build

RUN mkdir -p /usr/app/dist
COPY .env /usr/app
RUN ls
ADD dist /usr/app/dist
ADD node_modules /usr/app/node_modules

WORKDIR /usr/app

EXPOSE 4000

CMD [ "node", "./dist/index.js" ]