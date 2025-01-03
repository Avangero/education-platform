#!/usr/bin/env bash
trap exit SIGINT

./vendor/bin/sail down --volumes --remove-orphans
./vendor/bin/sail pull --ignore-buildable --ignore-pull-failures --include-deps
./vendor/bin/sail build
./vendor/bin/sail composer install --no-interaction --prefer-dist --ignore-platform-reqs
./vendor/bin/sail up --detach
./vendor/bin/sail artisan down
npm ci --no-audit --no-fund
npm run build
sleep 20
./vendor/bin/sail artisan migrate:fresh --force
./vendor/bin/sail artisan db:seed --force
./vendor/bin/sail artisan module:seed --force
./vendor/bin/sail artisan optimize
./vendor/bin/sail artisan up
npm run dev
