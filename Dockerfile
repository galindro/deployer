FROM node:0.10.33

RUN apt-get -y update && apt-get install golang -y

RUN git clone https://github.com/coreos/fleet.git /usr/lib/fleet
RUN cd /usr/lib/fleet && ./build
RUN ln -s /usr/lib/fleet/bin/fleetctl /usr/local/bin/fleetctl

ADD . /usr/src/deployer
WORKDIR /usr/src/deployer
RUN npm install --unsafe-perm

CMD npm start
