FROM node:16.20
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
ENV MONGO_HOST=mongodb
ENV MONGO_PORT=27017
ENV MONGO_DB=mydb
CMD ["npm", "start"]
