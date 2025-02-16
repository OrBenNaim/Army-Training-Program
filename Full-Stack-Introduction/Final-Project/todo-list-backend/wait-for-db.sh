#!/bin/sh

echo "Waiting for PostgreSQL to be ready..."
until nc -z -v -w30 $DB_HOST $DB_PORT; do
  echo "Waiting for database connection..."
  sleep 5
done

echo "Database is up. Running migrations..."
exec "$@"
