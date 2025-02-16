FROM node:18

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .
RUN npm run build 

EXPOSE 3000

# Wait for database to be ready, then run migrations
CMD npx drizzle-kit migrate && npm run start
