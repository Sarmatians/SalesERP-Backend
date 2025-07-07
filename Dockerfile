FROM node:18

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --force

# Copy source code
COPY . .

# Debug: Check if essential files exist
RUN echo "=== Checking project structure ===" && \
    ls -la && \
    echo "=== tsconfig.json content ===" && \
    cat tsconfig.json && \
    echo "=== Source files ===" && \
    find src -type f -name "*.ts" | head -10

# Build the application
RUN echo "=== Starting build ===" && \
    npm run build && \
    echo "=== Build completed ===" && \
    ls -la dist/ && \
    echo "=== Checking for main.js ===" && \
    ls -la dist/main* || echo "No main.js found in dist/"

# Verify the main file exists before starting
RUN test -f dist/main.js || (echo "ERROR: dist/main.js not found!" && exit 1)

EXPOSE 3000

CMD ["npm", "run", "start:prod"]