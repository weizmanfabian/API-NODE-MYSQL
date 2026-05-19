# Imagen del backend Node.js + Express.
# Build multi-etapa: las dependencias se instalan en una etapa aparte
# para aprovechar la caché de capas de Docker.

# ---- Etapa de dependencias ----
FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# ---- Etapa de ejecución ----
FROM node:24-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY --from=deps /app/node_modules ./node_modules
COPY package.json ./
COPY config.js app.js ./
COPY src ./src

# Ejecuta como usuario sin privilegios (incluido en la imagen oficial de node).
USER node

EXPOSE 5000
CMD ["node", "app.js"]
