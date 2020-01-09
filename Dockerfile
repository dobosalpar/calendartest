FROM node:10-alpine

USER root

RUN apk update
RUN apk add git

RUN mkdir /build-clone
RUN chmod -R a+rwX /build-clone

RUN mkdir /.npm
RUN chmod -R a+rwX /.npm

RUN apk add chromium
EXPOSE 9000-9000

