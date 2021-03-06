FROM ubuntu:16.04

RUN apt-get update

RUN apt-get install -y curl
RUN curl --silent --location https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs
RUN apt-get install -y build-essential

ADD . /

RUN npm install

EXPOSE 5000

CMD npm start