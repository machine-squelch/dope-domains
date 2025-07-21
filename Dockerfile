# Use Node.js 18 Alpine as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first (for better caching)
COPY package*.json ./

# Install ALL dependencies (including devDependencies for building)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Install serve globally for serving static files
RUN npm install -g serve

# Expose port 3000
EXPOSE 3000

# Start the application serving the built dist folder
CMD ["serve", "-s", "dist", "-l", "3000"]

