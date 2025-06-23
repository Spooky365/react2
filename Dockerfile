# =================================================================
# Stage 1: Build the React Application
# =================================================================
FROM node:18-alpine AS builder

WORKDIR /app

# Copy ONLY package files first to leverage Docker cache.
# This layer only rebuilds if package.json or package-lock.json changes.
COPY package*.json ./

# Install dependencies. This is the slowest step, so we want it to be cached
# as often as possible.
RUN npm ci

# Now copy the rest of the application source code.
# This layer only rebuilds if source files change.
COPY . .

# Build the application. This only runs if the source code has changed,
# or if the dependencies were reinstalled.
RUN npm run build


# =================================================================
# Stage 2: Serve Application with Nginx
# =================================================================
FROM nginx:alpine AS production

# Install curl for health checks
RUN apk add --no-cache curl

# Copy the custom Nginx configuration.
# We copy this first so that if we only change the app code, this layer is cached.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built static assets from the 'builder' stage.
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# Health check remains the same
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
