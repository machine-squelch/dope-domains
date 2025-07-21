#!/bin/bash

# dopedomains.com Digital Ocean Deployment Script
# Usage: ./deploy.sh

set -e

echo "🚀 Starting dopedomains.com deployment..."

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "📦 Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "📦 Installing Docker Compose..."
    apt update
    apt install docker-compose -y
fi

# Create application directory
echo "📁 Setting up application directory..."
mkdir -p /var/www/dopedomains
cd /var/www/dopedomains

# Stop existing containers if running
echo "🛑 Stopping existing containers..."
docker-compose down 2>/dev/null || true

# Build and start the application
echo "🔨 Building and starting dopedomains.com..."
docker-compose up -d --build

# Wait for the application to start
echo "⏳ Waiting for application to start..."
sleep 10

# Check if the application is running
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ dopedomains.com is running successfully!"
    echo "🌐 Access your site at: http://$(curl -s ifconfig.me)"
    echo "📊 Check status with: docker-compose ps"
    echo "📝 View logs with: docker-compose logs -f"
else
    echo "❌ Deployment failed. Check logs with: docker-compose logs"
    exit 1
fi

echo "🎉 Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Point your domain dopedomains.com to this server's IP"
echo "2. Set up SSL with: certbot --nginx -d dopedomains.com"
echo "3. Configure Nginx for production (see DIGITAL_OCEAN_DEPLOYMENT.md)"

