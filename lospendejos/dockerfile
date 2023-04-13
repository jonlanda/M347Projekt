# Use an official Node.js runtime as a parent image
FROM node:latest

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the rest of the app files to the container
COPY . .

# Build the Vue.js app for production
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Start the backend server
CMD [ "node", "backend/server.js" ]
