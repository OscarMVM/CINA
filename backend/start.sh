#!/bin/bash

# Railway start script for Laravel
echo "Starting Laravel application on Railway..."

# Install dependencies
echo "Installing PHP dependencies..."
composer install --optimize-autoloader --no-dev --no-interaction

# Generate app key if not present
if [ -z "$APP_KEY" ] || [ "$APP_KEY" = "" ]; then
    echo "Generating application key..."
    php artisan key:generate --force
fi

# Clear and cache configuration for better performance
echo "Optimizing Laravel..."
php artisan config:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set proper permissions
chmod -R 755 storage bootstrap/cache

echo "Starting PHP development server on port $PORT..."
exec php -S 0.0.0.0:$PORT -t public/