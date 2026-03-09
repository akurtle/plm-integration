FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY tsconfig.base.json ./
COPY apps/worker/package*.json ./apps/worker/
RUN npm install
COPY . .
WORKDIR /app/apps/worker
RUN npm run build
CMD ["npm", "run", "start"]