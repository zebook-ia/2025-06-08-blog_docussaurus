# Multi-stage Dockerfile for building and serving the Docusaurus blog
# Stage 1: Build the static site
FROM node:18-bullseye AS build

# Directory where the source code will live inside the container
WORKDIR /app

# Install dependencies first for better layer caching
COPY package*.json ./
RUN npm install --production=false

# Copy all project files
COPY . .

# Generate the static "build" directory
RUN npm run build

# Stage 2: Use a lightweight runtime image to serve the site
FROM node:18-bullseye AS runner
WORKDIR /app

# Copy only the build directory from the previous stage
COPY --from=build /app/build ./build

# Install a simple static file server
RUN npm install -g serve

# Expose the port used by the serve command
EXPOSE 3000

# Default command to serve the production build
CMD ["serve", "-s", "build", "-l", "3000"]
