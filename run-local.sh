#!/usr/bin/env bash
# One command to run the whole project on your computer:   bash run-local.sh
# Needs: Node.js 20+ and MongoDB running locally. No .env files needed.
set -e
cd "$(dirname "$0")"

for d in server client admin2; do
  if [ ! -d "$d/node_modules" ]; then echo ">> Installing $d ..."; (cd $d && npm install --no-audit --no-fund); fi
done

echo ">> Adding demo products (only if the shop is empty) ..."
(cd server && node scripts/seed.js)
echo ">> Creating admin account ..."
(cd server && ADMIN_EMAIL=admin@shop.local ADMIN_PASSWORD=Admin12345 ADMIN_NAME=Admin node scripts/createAdmin.js) || true

trap 'kill 0' EXIT INT TERM
(cd server && npm run dev) &
sleep 3
(cd client && npm run dev -- --port 5173 --strictPort) &
(cd admin2 && npm run dev -- --port 5174 --strictPort) &

echo ""
echo "=============================================================="
echo " Shop   : http://localhost:5173"
echo " Admin  : http://localhost:5174   (admin@shop.local / Admin12345)"
echo " API    : http://localhost:8000/health"
echo " Sign-up codes appear in THIS window (look for 'DEV EMAIL')."
echo " Press Ctrl+C to stop everything."
echo "=============================================================="
wait
