# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /loligo-front
COPY . .
RUN npm install
CMD ["npm", "run", "dev"]
EXPOSE 5173