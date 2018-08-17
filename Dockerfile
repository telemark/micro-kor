###########################################################
#
# Dockerfile for micro-kor
#
###########################################################

# Setting the base to nodejs 10
FROM mhart/alpine-node:10

# Maintainer
MAINTAINER Jonas Enge

#### Begin setup ####

# Installs docker

# Extra tools for native dependencies
# RUN apk add --no-cache make gcc g++ python

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

# Env variables

# Expose 3000
EXPOSE 3000

# Startup
ENTRYPOINT npm start

