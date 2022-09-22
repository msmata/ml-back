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

EXPOSE 4000

CMD [ "node", "./dist/index.js" ]