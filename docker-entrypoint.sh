#!/bin/sh
set -eu

mkdir -p /app/db
npx prisma migrate deploy
exec npm start
