FROM ubuntu:14.04
ENV BUILD_DATE=16_10_2016
RUN apt-get update --fix-missing
RUN apt-get install -y software-properties-common python-software-properties curl
RUN curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
RUN apt-get install -y nodejs git git-core gcc make build-essential
RUN npm install -g nodemon mocha
ENV NODE_PATH=.:/usr/lib/node_modules:/node_modules
WORKDIR /app
#ADD app/package.json /package.json
ADD app/app.js /app/app.js
RUN mkdir -p /node_modules
#RUN npm install --prefix /

CMD ["node", "/app/app.js"]
