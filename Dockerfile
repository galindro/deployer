FROM node:0.10.33

# Install docker client
RUN apt-get update && apt-get install -y aufs-tools ca-certificates curl git iptables xz-utils

RUN curl -fsSL https://get.docker.com |bash

# Uses the docker socket shared from the host machine
ENV DOCKER_HOST unix:///tmp/docker.sock

ADD . /usr/src/deployer
WORKDIR /usr/src/deployer
RUN npm install --unsafe-perm

CMD ["npm", "start"]
