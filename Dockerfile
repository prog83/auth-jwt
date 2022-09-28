FROM node:16-alpine
WORKDIR /app
COPY ./node_modules ./node_modules
COPY ./build ./build
ENV NODE_PATH=./build
ENV NODE_ENV=production

EXPOSE 3000

ENTRYPOINT ["node", "./build/main.js"]
