# Use official Node.js LTS as base image
FROM node:22

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

# Compile TypeScript to JavaScript
RUN npm run build

EXPOSE 3000

# Start the app
CMD ["node", "dist/app.js"]