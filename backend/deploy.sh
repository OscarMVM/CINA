#!/bin/bash

echo "Deploying Laravel application..."

# Install PHP dependencies
composer install --optimize-autoloader --no-dev

# Generate application key if not present
php artisan key:generate --force

# Cache configuration for better performance
php artisan config:cache
php artisan route:cache

# Run database migrations
php artisan migrate --force

echo "Deployment completed successfully!"