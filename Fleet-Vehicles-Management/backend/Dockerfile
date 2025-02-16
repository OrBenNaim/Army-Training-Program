FROM node:18

# This command sets /app as the working directory inside the container:
WORKDIR /app

# Copy Package Files (Optimized Caching):
COPY package.json package-lock.json ./

# Installs all project dependencies from package.json:
RUN npm install

# Copy the Rest of the Application Code:
COPY . .

# Build the Application:
RUN npm run build 

# Expose the Backend Port - Opens port 5000 inside the container so it can accept incoming requests.
EXPOSE 5000

# Start the NestJS application:
CMD ["npm", "run", "start:dev"]
