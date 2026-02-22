# Use official Playwright image with Node + browsers pre-installed.
# Pin version to match @playwright/test in package.json to avoid browser mismatch.
FROM mcr.microsoft.com/playwright:v1.57.0-noble

WORKDIR /app

# Copy dependency manifests first for better layer caching
COPY package.json package-lock.json* ./

# Install dependencies (no browser install needed; they're in the base image)
RUN npm ci

# Copy the rest of the project
COPY . .

# Run tests when the container starts (CI env enables headless + retries in playwright.config)
ENV CI=true
CMD ["npx", "playwright", "test"]
