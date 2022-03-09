FROM node:14.19-alpine3.14
WORKDIR /app
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
RUN yarn
COPY . /app
CMD ["yarn", "build"]
