# --- Stage 1: The "Builder" ---
# This stage builds the React app. It uses a Node.js base image.
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker layer caching
COPY package*.json ./

# Install all the dependencies
RUN npm install

# Copy the rest of the application's source code
COPY . .

# Run the production build command
RUN npm run build


# --- Stage 2: The "Production" server ---
# This stage builds the final image. It uses a lightweight NGINX base image.
FROM nginx:1.25-alpine

# Copy the custom NGINX configuration we created
# This will overwrite the default NGINX config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built static files from the "builder" stage
# This is the magic of multi-stage builds! We only copy the build output.
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 to inform Docker that the container listens on this port
EXPOSE 80

# The default command to start NGINX in the foreground
CMD ["nginx", "-g", "daemon off;"]
