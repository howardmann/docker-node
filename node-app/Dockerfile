FROM node:6.7
LABEL maintainer="howieburger"
EXPOSE 3000
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install
CMD ["npm", "start"]
VOLUME /usr/src/app/src/