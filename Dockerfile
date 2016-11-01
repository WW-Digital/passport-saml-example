FROM node:6
# global installs
RUN npm install -g \
    bower \
    nodemon
# setup user and source permissions
RUN adduser --disabled-password --gecos '' nodeuser &&\
    adduser nodeuser sudo && \
    echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers
RUN mkdir -p /app
RUN chown -R nodeuser:nodeuser /app
# target working dir and user
WORKDIR /app
USER nodeuser
# setup node dependencies
COPY package.json /app
RUN npm install
# add binaries to path
ENV PATH /app/node_modules/.bin:$PATH
# setup app source and client dependencies
COPY ./sailpoint-auth-example /app/sailpoint-auth-example
RUN cd /app/sailpoint-auth-example && bower install
# setup default entrypoint
ENTRYPOINT [ "npm" ]
CMD [ "start" ]

