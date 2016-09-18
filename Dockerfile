FROM node:6
MAINTAINER Stein-Otto Svorstøl <steinotto@svorstol.com>

# Create app directory
RUN mkdir -p /app
WORKDIR /app

EXPOSE 9000

# Copy application
COPY . /app

# Build image
RUN npm install
RUN npm run build
