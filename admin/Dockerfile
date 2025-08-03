FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the admin panel
RUN npm run build

# Expose port
EXPOSE 3001

# Serve the built admin panel
CMD ["npm", "run", "preview"]
