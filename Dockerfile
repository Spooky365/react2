# =================================================================
# Stage 1: Build the React Application (This stage remains the same)
# =================================================================
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# =================================================================
# Stage 2: Create the Security-Hardened Production Server
# =================================================================
FROM node:18-alpine AS production
WORKDIR /app

# NEU: Erstelle einen dedizierten non-root User und eine Gruppe
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Install curl for the health check
RUN apk add --no-cache curl

# Kopiere die package-Dateien und setze die Berechtigungen, BEVOR npm install läuft
COPY package*.json ./
RUN chown -R appuser:appgroup .

# NEU: Wechsle zum non-root User, um npm install auszuführen
USER appuser

# Installiere NUR die production-Abhängigkeiten. Läuft jetzt als 'appuser'
RUN npm install --production

# NEU: Wechsle temporär zurück zu root, um Dateien aus dem Builder-Stage zu kopieren
USER root

# Kopiere die gebaute App und den Server-Code
COPY --from=builder /app/dist ./dist
COPY server.js .

# NEU: Setze die finalen Berechtigungen für alle Anwendungsdateien
RUN chown -R appuser:appgroup .

# NEU: Wechsle final zum non-root User, um die App auszuführen
USER appuser

# GEÄNDERT: Expose den non-privileged Port
EXPOSE 3001

# GEÄNDERT: Health check zielt auf den neuen Port
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/ || exit 1

# Der CMD-Befehl bleibt gleich, wird aber jetzt als 'appuser' ausgeführt
CMD [ "node", "server.js" ]
