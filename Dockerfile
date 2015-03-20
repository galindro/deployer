FROM node:0.10.33

ADD . /usr/src/deployer
WORKDIR /usr/src/deployer
RUN npm install --unsafe-perm

CMD npm start
